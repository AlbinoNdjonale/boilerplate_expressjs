import { Router } from "express"

import ProductView from "../views/product"

const router = Router()

router.route('/').post(async (req, res) => await ProductView.create(req, res))
router.route('/:id').get(async (req, res) => await ProductView.get(req, res))
router.route('/:id').delete(async (req, res) => await ProductView.delete(req, res))
router.route('/').get(async (req, res) => await ProductView.list(req, res))
router.route('/:id').put(async (req, res) => await ProductView.update(req, res))
router.route('/from_enterprise/:enterprise_id').get(async (req, res) => await ProductView.list_from_enterprise(req, res))

export default router
