"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_js_1 = require("../../controllers/thoughtController.js");
const router = (0, express_1.Router)();
// Base thought routes
router.route('/')
    .get(thoughtController_js_1.getAllThoughts)
    .post(thoughtController_js_1.createThought);
// Single thought routes
// /api/thoughts/:thoughtId
// /api/thoughts/:thoughtId/reactions
router.route('/')
    .get(thoughtController_js_1.getThoughtById)
    .put(thoughtController_js_1.updateThought)
    .delete(thoughtController_js_1.deleteThought);
// Add a reaction to a thought
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(thoughtController_js_1.addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController_js_1.removeReaction);
exports.default = router;
