const express = require('express');
const SchoolController = require('../controllers/schoolController');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    School:
 *      type: object
 *      required:
 *        - id
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of a school
 *        name:
 *          type: string
 *          description: name of the school
 *        address:
 *          type: string
 *          description: school address
 *      example:
 *        id: 1
 *        name: Makers
 *        address: Tabyshalieva 29
 */

/**
 * @swagger
 * /school:
 *    get:
 *      summary: returns all schools
 *      tags: [School]
 *      responses:
 *        200:
 *          description: the list of the schools
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/School'
 *        500:
 *          description: internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error;
 */

router.get('/', SchoolController.getAll);

/**
 * @swagger
 * /school/{id}:
 *    get:
 *      summary: gets schools by id
 *      tags: [School]
 *      parameters:
 *        - in : path
 *          name: id
 *          description: id of school
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: school by its id
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: The school id
 *                    example: 1
 *                  name:
 *                    type: string
 *                    description: The name of the school
 *                    example: Makers
 *                  address:
 *                    type: string
 *                    description: The address of the school
 *                    example: Tabyshalieva 29
 *        500:
 *         description: internal server error
 */
router.get('/:id');

/**
 * @swagger
 * /school:
 *    post:
 *      summary: Create a new school
 *      tags: [School]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/School'
 *      responses:
 *        200:
 *          description: The school was created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/School'
 */
router.post('/', SchoolController.create);

/**
 * @swagger
 * /school/{id}:
 *    delete:
 *      summary: remove school by id
 *      tags: [School]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: id to remove school
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The school was deleted
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: deleted
 *        404:
 *          description: School not found
 */
router.delete('/:id');

/**
 * @swagger
 * /school/{id}
 *    patch:
 *      summary: Update school info by id
 *      tags: [School]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The school id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: name of the school
 *                  example: Makers
 *                address:
 *                  type: string
 *                  description: address of the school
 *                  example: Tabyshalieva 29
 *
 */
router.patch('/:id');

module.exports = router;
