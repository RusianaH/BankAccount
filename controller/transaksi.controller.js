const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function Insert (req, res){
 
    const {source_account_id, destination_account_id} = req.body

    const payload = {
       source_account_id,
       destination_account_id
    }
    try {
        const transactions = await prisma.transactions.create({
            data: payload
        })

        let resp = ResponseTemplate(transactions, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Get(req, res) {

    const {source_account_id, destination_account_id} = req.query

    const payload = {}

    if (source_account_id) {
        payload.source_account_id = source_account_id
    }

    if (destination_account_id ){
        payload.destination_account_id = destination_account_id
    }

    try {

        const transactions = await prisma.transactions.findMany({
            where: payload
        });

        let resp = ResponseTemplate(transactions, 'success', null, 200)
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
        const transactions = await prisma.transactions.findUnique({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(transactions, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { source_account_id, destination_account_id} = req.body
    const { id } = req.params

    const payload = {}

    if (!source_account_id && !destination_account_id) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }
    if (source_account_id) {
        payload.source_account_id = source_account_id
    }

    if (destination_account_id) {
        payload.destination_account_id = destination_account_id
    }
 
    

    try {
        const transactions = await prisma.transactions.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(transactions, 'success', null, 200)
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
        const transactions = await prisma.transactions.delete({
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


  
