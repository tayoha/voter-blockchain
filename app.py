import sqlite3
from flask import Flask, jsonify, request, render_template, send_from_directory
app = Flask(__name__)

# initialize database to store voter information
conn = sqlite3.connect("voters.db")

c = conn.cursor()
c.execute("""CREATE TABLE IF NOT EXISTS voters (
            valid integer,
            first_name text,
            middle_name text,
            last_name text,
            dob text,
            addr text,
            transaction_type integer,
            time_stamp integer,
            hashed_ident text,
            ident_type text
        )""")

conn.commit()
conn.close()

# when form submits, put user in database
@app.route('/', methods=["GET", "POST"])
def print_form():
    if request.method == "GET":
        return render_template("index.html")
    else:
        conn = sqlite3.connect("voters.db")
        print(request.json)
        valid_in = request.json["valid"]
        first_name_in = request.json["first_name"]
        middle_name_in = request.json["middle_name"]
        last_name_in = request.json["last_name"]
        dob_in = request.json["dob"]
        addr_in = request.json["addr"]
        transaction_type_in = request.json["transaction_type"]
        time_stamp_in = request.json["time_stamp"]
        hashed_ident_in = request.json["hashed_ident"]
        ident_type_in = request.json["ident_type"]
        # check if person already in database
        cur = conn.execute(
            "SELECT dob FROM voters WHERE first_name=(?)", ([first_name_in])
        )
        fetch = cur.fetchone()
        if (not fetch):
            # insert user into database
            conn.execute(
            "INSERT INTO voters(valid, first_name, middle_name, last_name, dob, addr, transaction_type, time_stamp, hashed_ident, ident_type)" +
            "VALUES ((?), (?), (?), (?), (?), (?), (?), (?), (?), (?))", (valid_in, first_name_in, middle_name_in, last_name_in, dob_in, addr_in, transaction_type_in, time_stamp_in, hashed_ident_in, ident_type_in)
            )
        else:
            conn.execute(
            "UPDATE voters SET valid = (?), first_name = (?), middle_name = (?), last_name = (?), dob = (?), addr = (?), transaction_type = (?), time_stamp = (?), ident_type = (?) " +
            "WHERE hashed_ident = (?)", (valid_in, first_name_in, middle_name_in, last_name_in, dob_in, addr_in, transaction_type_in, time_stamp_in, ident_type_in, hashed_ident_in)
            )
        # test print of database
        cur = conn.execute(
            "SELECT dob FROM voters WHERE first_name=(?)", ([first_name_in])
        )
        fetch = cur.fetchall()
        print(fetch)
        conn.close()
        return "Success!", 200

# handle GET requests for javascript files
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

# handle GET requests for json files
@app.route('/json/<path:path>')
def send_json(path):
    return send_from_directory('build/contracts', path)

# handle GET requests for json files
@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('templates/assets/css', path)

@app.route('/favicon.ico') 
def favicon(): 
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico')

if __name__ == '__main__':
    app.run(port=3000)