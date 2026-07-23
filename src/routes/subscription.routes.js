const express = require("express");
const router = express.Router();

const subscriptionController = require("../controllers/subscription.controller");
const verifyJWT = require("../middlewares/auth.middleware");



/**
 * @swagger
 * /subscriptions/{channelId}:
 *   post:
 *     tags:
 *       - Subscription
 *     summary: Subscribe to a channel
 *     description: Subscribes the authenticated user to a channel.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: Channel (User) ID.
 *     responses:
 *       201:
 *         description: Subscription created successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Channel not found.
 */
router.post(
  "/:channelId",
  verifyJWT,
  subscriptionController.subscribeChannel
);


/**
 * @swagger
 * /subscriptions/{channelId}:
 *   delete:
 *     tags:
 *       - Subscription
 *     summary: Unsubscribe from a channel
 *     description: Removes the authenticated user's subscription from a channel.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: Channel (User) ID.
 *     responses:
 *       200:
 *         description: Unsubscribed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Subscription not found.
 */
router.delete(
  "/:channelId",
  verifyJWT,
  subscriptionController.unsubscribeChannel
);

/**
 * @swagger
 * /subscriptions/channel/{channelId}:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Get channel subscribers
 *     description: Returns all subscribers of a specific channel.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: Channel (User) ID.
 *     responses:
 *       200:
 *         description: Subscribers fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Channel not found.
 */
router.get(
  "/channel/:channelId",
  verifyJWT,
  subscriptionController.getChannelSubscribers
);

/**
 * @swagger
 * /subscriptions/me:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Get my subscriptions
 *     description: Returns all channels the authenticated user is subscribed to.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscriptions fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */
router.get(
  "/me",
  verifyJWT,
  subscriptionController.getMySubscriptions
);



module.exports = router;