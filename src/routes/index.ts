import { Router } from "express"

import enterprise_router from './enterprise'
import product_router from './product'

const router = Router()

router.use('/enterprise', enterprise_router)
router.use('/product', product_router)

export default router