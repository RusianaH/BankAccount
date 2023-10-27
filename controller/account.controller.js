const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function Insert (req, res){
 
    const {user_id, bank_name, bank_account_number, balance} = req.body

    const payload = {
        user_id,
        bank_name,
        bank_account_number,
        balance
    }
    try {
        const bank_accounts = await prisma.bank_accounts.create({
            data: payload
        })

        let resp = ResponseTemplate(bank_accounts, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Get(req, res) {

    const { user_id, bank_name, bank_account_number, balance} = req.query

    const payload = {}

    if (user_id) {
        payload.user_id = user_id
    }

    if (bank_name) {
        payload.bank_name = bank_name
    }

    if (bank_account_number) {
        payload.bank_account_number = bank_account_number
    }
    if (balance) {
        payload.balance = balance
        
    }

    try {

        const bank_accounts = await prisma.bank_accounts.findMany({
            where: payload
        });

        let resp = ResponseTemplate(bank_accounts, 'success', null, 200)
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
        const bank_accounts = await prisma.bank_accounts.findUnique({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(bank_accounts, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { user_id, bank_name, bank_account_number, balance } = req.body
    const { id } = req.params

    const payload = {}

    if (!user_id && !bank_name && !bank_account_number && !balance) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }
    if (user_id) {
        payload.user_id = user_id
    }

    if (bank_name) {
        payload.bank_name = bank_name
    }

    if (bank_account_number) {
        payload.bank_account_number = bank_account_number
    }
    if (balance) {
        payload.balance = balance
        
    }

    try {
        const bank_accounts = await prisma.bank_accounts.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(bank_accounts, 'success', null, 200)
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
        const bank_accounts = await prisma.bank_accounts.delete({
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


  
