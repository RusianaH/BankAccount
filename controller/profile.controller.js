const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function Insert (req, res){
 
    const {user_id, identify_type, identify_number, adress} = req.body

    const payload = {
        user_id,
        identify_type,
        identify_number,
        adress
    }
    try {
        const profiles = await prisma.profiles.create({
            data: payload
        })

        let resp = ResponseTemplate(profiles, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Get(req, res) {

    const { user_id, identify_type, identify_number, adress } = req.query

    const payload = {}

    if (user_id) {
        payload.user_id = user_id
    }

    if (identify_type) {
        payload.identify_type = identify_type
    }

    if (identify_number) {
        payload.identify_number = identify_number
    }
    if (adress) {
        payload.adress = adress
        
    }

    try {

        const profiles = await prisma.profiles.findMany({
            where: payload
        });

        let resp = ResponseTemplate(profiles, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function GetByPK(req, res) {

    const { id } = req.params

    try {
        const profileWithuser = await prisma.profiles.findUnique({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(profileWithuser, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { user_id, identify_type,identify_number, adress } = req.body
    const { id } = req.params

    const payload = {}

    if (!user_id && !identify_type && !identify_number && !adress) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }
    if (user_id) {
        payload.user_id = user_id
    }

    if (identify_type) {
        payload.identify_type = identify_type
    }

    if (identify_number) {
        payload.identify_number = identify_number
    }
    if (adress) {
        payload.adress = adress
        
    }

    try {
        const profiles = await prisma.profiles.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(profiles, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Delete(req, res) {

    const { id } = req.params;

    try {
        const profiles = await prisma.profiles.delete({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(null, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}


module.exports = {
    Insert,
    Get,
    GetByPK,
    Update,
    Delete
}


  
