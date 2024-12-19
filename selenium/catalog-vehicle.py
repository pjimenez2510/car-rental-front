from selenium import webdriver 
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.ui import WebDriverWait 
import time


def setup_driver():
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    driver.get('http://localhost:3001')
    return driver

def test_catalog_view():
    driver = setup_driver()

        