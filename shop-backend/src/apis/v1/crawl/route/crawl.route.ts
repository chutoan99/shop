import express, { Router } from 'express'
import crawlControllers from '../controller/crawl.controller'
import dotenv from 'dotenv'
dotenv.config()

const router: Router = express.Router()

router.get('/tiki/productDetail', crawlControllers.ProductsDetail)
router.get('/tiki/products', crawlControllers.Products)
router.get('/tiki/shops', crawlControllers.Shops)
router.get('/flashSale', crawlControllers.FlashSale)
router.get('/hotItems', crawlControllers.HotItems)
router.get('/ratings', crawlControllers.Ratings)
router.get('/shopInfo', crawlControllers.ShopInfo)
router.get('/shopDetail', crawlControllers.ShopDetail)
router.get('/getItem', crawlControllers.GetItem)
router.get('/getallcate', crawlControllers.CATE)
router.get('/shopMall', crawlControllers.ShopMall)

export default router
