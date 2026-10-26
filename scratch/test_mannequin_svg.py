import re

def shade_color(hex_color, percent):
    c = hex_color.replace("#", "")
    if len(c) == 3:
        c = "".join([x*2 for x in c])
    num = int(c, 16)
    amt = round(2.55 * percent)
    r = min(255, max(0, (num >> 16) + amt))
    g = min(255, max(0, ((num >> 8) & 0x00FF) + amt))
    b = min(255, max(0, (num & 0x0000FF) + amt))
    return f"#{r:02x}{g:02x}{b:02x}"

print("Crimson Highlight:", shade_color("#b61827", 25))
print("Crimson Shadow:", shade_color("#b61827", -30))
print("Emerald Highlight:", shade_color("#187a70", 25))
print("Ivory Highlight:", shade_color("#f4ede2", 10))
