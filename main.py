from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image

options = Options()
options.add_argument("--headless")
options.add_argument("--window-size=1080,1920")  # Big enough height

driver = webdriver.Chrome(options=options)
driver.get("file:///E:/Lanosch/videoatekos_nyitas/weblap/index.html")
driver.save_screenshot("fullpage.png")
driver.quit()
