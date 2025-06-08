import { Router } from "express"

import EnterpriseView from "../views/enterprise"

const router = Router()

router.route('/').post(async (req, res) => await EnterpriseView.create(req, res))
router.route('/:id').get(async (req, res) => await EnterpriseView.get(req, res))
router.route('/:id').delete(async (req, res) => await EnterpriseView.delete(req, res))
router.route('/').get(async (req, res) => await EnterpriseView.list(req, res))
router.route('/:id').put(async (req, res) => await EnterpriseView.update(req, res))

export default router