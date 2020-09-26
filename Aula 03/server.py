import http.server, socketserver
import re

PORT = 8000


class SimpleHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        match = re.search("\.(js|ico|html|png|css|map)$", self.path)
        res = None
        self.send_response(200)
        filename = "index.html" if match is None else self.path[1:]
        if self.path.endswith(".css"):
            self.send_header("Content-type", "text/css")
        f = open(filename, "rb")
        self.end_headers()
        self.wfile.write(f.read())


Handler = SimpleHandler
httpd = socketserver.TCPServer(("", PORT), Handler)
httpd.serve_forever()
