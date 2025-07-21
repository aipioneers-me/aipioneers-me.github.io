from PIL import Image

img = Image.open("favicon.png")
img.save("favicon.ico", format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
