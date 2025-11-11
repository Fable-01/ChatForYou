### JUST FOR LEARNING PURPOSE USE AT YOUR OWN RISK !!!!! ####

import ccxt
import json
import pandas as pd
import time
import decimal
from datetime import datetime
import pytz
import csv

def read_config():
    with open('config.json') as json_file:
        return json.load(json_file)

config = read_config()

# API setup
api_key = config["apiKey"]
api_secret = config["secret"]
password = config["password"]      # OKX ต้องใช้ "password" (ไม่ใช่ subaccount)
account_name = config["account_name"]
pair = config["pair"]
token_name = config["token_name"]
fix_value = config["rebalance_value"]

# -------------------- OKX EXCHANGE INIT --------------------
exchange = ccxt.okx({
    'apiKey': api_key,
    'secret': api_secret,
    'password': password,
    'enableRateLimit': True
})

# ใช้แบบ spot เท่านั้น
exchange.options["defaultType"] = "spot"

# Global settings
post_only = True
token_name_lst = [token_name]
pair_lst = [pair]
fix_value_lst = [fix_value]
tradelog_file = f"tradinglog_{account_name}.csv"
trading_call_back = 5
min_reb_size = 1.5
time_sequence = [2, 5, 0, 2, 9, 0, 7, 8, 7, 5, 0, 9, 5, 8]
time_multiplier = 1

token_fix_value = {token_name_lst[i]: fix_value_lst[i] for i in range(len(token_name_lst))}
pair_dict = {token_name_lst[i]: pair_lst[i] for i in range(len(token_name_lst))}

# -------------------- BASIC FUNCTIONS --------------------

def get_time():
    return time.strftime("%m/%d/%Y, %H:%M:%S", time.localtime())

def get_price():
    return float(exchange.fetch_ticker(pair)['last'])

def get_ask_price():
    return float(exchange.fetch_ticker(pair)['ask'])

def get_bid_price():
    return float(exchange.fetch_ticker(pair)['bid'])

def get_pending_buy():
    orders = exchange.fetch_open_orders(pair)
    return [o for o in orders if o['side'] == 'buy']

def get_pending_sell():
    orders = exchange.fetch_open_orders(pair)
    return [o for o in orders if o['side'] == 'sell']

def create_buy_order():
    exchange.create_order(pair, 'limit', 'buy', buy_size, buy_price, {'postOnly': post_only})
    print(f"{asset_name} Buy Order Created")

def create_sell_order():
    exchange.create_order(pair, 'limit', 'sell', sell_size, sell_price, {'postOnly': post_only})
    print(f"{asset_name} Sell Order Created")

def cancel_order(order_id):
    exchange.cancel_order(order_id, pair)
    print(f"Order ID : {order_id} Successfully Canceled")

def get_wallet_details():
    return exchange.fetch_balance()['info']['data'][0]['details']

def get_cash():
    balances = exchange.fetch_balance()
    return float(balances['total']['USDT'])

def get_total_asset_value(wallet):
    total_value = 0
    for item in wallet:
        usd_value = float(item.get('eqUsd', 0))
        total_value += usd_value
    return round(total_value, 2)

# -------------------- TRADE LOG SETUP --------------------

def checkDB():
    try:
        tradinglog = pd.read_csv(tradelog_file)
        print('Database found.')
    except:
        tradinglog = pd.DataFrame(columns=['id','timestamp','time','pair','side','price','qty','fee','bot_name','account','cost'])
        tradinglog.to_csv(tradelog_file, index=False)
        print("Database created.")
    return tradinglog

tradinglog = checkDB()

def get_trade_history(pair):
    trades = exchange.fetch_my_trades(pair, limit=trading_call_back)
    df = pd.DataFrame(trades)
    if not df.empty:
        df['fee'] = [t['fee']['cost'] for t in trades]
        df['cost'] = df['price'] * df['amount']
    return df

def get_last_id(pair):
    df = get_trade_history(pair)
    return df['id'] if not df.empty else []

def update_trade_log(pair):
    tradinglog = pd.read_csv(tradelog_file)
    last_ids = get_last_id(pair)
    trade_history = get_trade_history(pair)
    for i in last_ids:
        if str(i) not in tradinglog.values:
            print(f"New Trade Found: {i}")
            trade = trade_history.loc[trade_history['id'] == i].iloc[0].to_dict()
            d = datetime.fromtimestamp(trade['timestamp']/1000, tz=pytz.utc).astimezone(pytz.timezone('Asia/Bangkok'))
            Date = d.strftime("%Y-%m-%d")
            Time = d.strftime("%H:%M:%S")
            row = [trade['id'], Date, Time, trade['symbol'], trade['side'], trade['price'], trade['amount'], trade['fee'], account_name, account_name, trade['cost']]
            with open(tradelog_file, "a+", newline='') as fp:
                csv.writer(fp).writerow(row)
            print(f"Recording Trade ID : {i}")
        else:
            print("Trade already recorded.")

# -------------------- MAIN LOOP --------------------

while True:
    try:
        print('Validating Trading History')
        update_trade_log(pair)
        print("------------------------------")

        balances = exchange.fetch_balance()
        wallet = balances['info']['data'][0]['details']
        cash = get_cash()
        print(f"Time: {get_time()}")
        print(f"Account: {account_name}")
        print(f"USDT Balance: {cash}")
        print(f"Total Asset Value: {get_total_asset_value(wallet)}")
        print("------------------------------")

        # Simplified rebalance logic
        for t in time_sequence:
            wallet = exchange.fetch_balance()['info']['data'][0]['details']
            for item in wallet:
                asset_name = item['ccy']
                if asset_name == 'USDT':
                    continue

                if asset_name not in token_fix_value:
                    continue

                usd_value = float(item['eqUsd'])
                fixed_value = token_fix_value[asset_name]
                diff = abs(fixed_value - usd_value)
                price = get_price()

                if usd_value < fixed_value - min_reb_size:
                    print(f"Rebalancing BUY {asset_name}")
                    buy_size = diff / price
                    buy_price = get_bid_price()
                    create_buy_order()

                elif usd_value > fixed_value + min_reb_size:
                    print(f"Rebalancing SELL {asset_name}")
                    sell_size = diff / price
                    sell_price = get_ask_price()
                    create_sell_order()

            print(f"Sleep {t * time_multiplier}s")
            time.sleep(t * time_multiplier)

    except Exception as e:
        print(f"Error: {e}")
        time.sleep(10)
