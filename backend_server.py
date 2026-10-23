"""
================================================================================
VASTRAÉ ATELIER — LOCAL STOREFRONT SERVER
================================================================================
A lightweight local static server for VASTRAÉ Digital Boutique.
Handles:
1. Static storefront asset delivery (HTML, CSS, JS, Images, Fonts).
2. Safe local testing CORS headers.
================================================================================
"""

import http.server
import socketserver
import os
import sys
import json
import urllib.parse

PORT = int(os.environ.get("PORT", 8080))
CONFIG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend_config.json")

class VastraeRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Clean HTTP handler for static boutique assets."""

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_HEAD(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/tryon/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            return
        return super().do_HEAD()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/tryon/status":
            self.send_json_response(200, {
                "status": "client_side_only",
                "message": "Customization and virtual preview operate entirely client-side without backend dependencies."
            })
            return
        return super().do_GET()

    def do_POST(self):
        self.send_json_response(200, {
            "success": True,
            "message": "Pure client-side customizer active."
        })

    def send_head(self):
        requested_path = os.path.normcase(os.path.realpath(self.translate_path(self.path)))
        protected_paths = {
            os.path.normcase(os.path.realpath(CONFIG_FILE)),
        }
        if requested_path in protected_paths:
            self.send_error(404, "Not Found")
            return None
        return super().send_head()

    def send_json_response(self, code, payload):
        resp_data = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(resp_data)))
        self.end_headers()
        self.wfile.write(resp_data)

def run_server():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("", PORT), VastraeRequestHandler) as httpd:
        print("=" * 72)
        print(f"[SERVER ONLINE] VASTRAE ATELIER STATIC SERVER ON PORT {PORT}")
        print(f"[STOREFRONT] http://localhost:{PORT}/Index.html")
        print("=" * 72)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server gracefully...")

if __name__ == "__main__":
    run_server()
