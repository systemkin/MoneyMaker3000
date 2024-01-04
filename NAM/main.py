from flask import *

app = Flask(  # Create a flask app
  __name__,
  template_folder='',  # Name of html file folder
  static_folder='static'  # Name of directory for static files
)


@app.route('/', defaults={'saved_data': None})
@app.route('127.0.0.1:5500/share/<saved_data>')
def home(saved_data):
  if saved_data:
    return render_template('index.html', info = str(saved_data))
  else:
    return render_template('index.html', info = "")


@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html', info = "")



if __name__ == "__main__":  # Makes sure this is the main process
  app.run( # Starts the site
    host='0.0.0.0',  # EStablishes the host, required for repl to detect the site
    port=8800  # Randomly select the port the machine hosts on.
  )
