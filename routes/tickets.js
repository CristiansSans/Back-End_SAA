const express = require('express')
const tickets = express.Router()
const cors = require('cors')
const email = require('../modelsMail/Mails')
const mailCredentials = require('../private/mail-credentials')
const io = require("../app")
const Mails = new email(mailCredentials)
const Ticket = require('../models/tickets')
const Client = require('../models/clients')



tickets.get('/', async (req, res) => {
	const clients = await Ticket.find()
    res.json(clients)
})

tickets.get('/todaytickets', async (req, res) => {
    try {
        var month = new Date().getMonth()
        var year = new Date().getFullYear()
        var day = new Date().getDate()
        const find = await Ticket.find({ 
                createdAt:{
                    $gte: new Date(year, month, day),
                    $lte: new Date(year, month, day+1)
                }
        })
        res.json(find)
    } catch (error) {
        console.log(error)
    }
    
})

tickets.get('/monthtickets', async (req, res) => {
    try {
        var month = new Date().getMonth()
        var year = new Date().getFullYear()
        var day = new Date().getDate()
        const find = await Ticket.find({ 
                createdAt:{
                    $gte: new Date(year, month, 1),
                    $lte: new Date(year, month+1, 1)
                }
        })
        res.json(find)
    } catch (error) {
        console.log(error)
    }
    
})


tickets.post('/', async (req, res) => {
    try {
        const findData = await Client.find({items: {$elemMatch:{ip: req.body.ip}}})
        if (findData) {
            var item = ''
            for (const pc of findData[0].items) {
                if (pc.ip == req.body.ip) {
                    item = pc
                    break
                }
            }
            const data = {
                client: findData[0].name,
                site: item.site,
                product: '',
                problem: "down",
                idResource: "123",
                ip: item.ip,
                type: "down",
                status: "Caido"
            }
            const mail = {
                from: "SAA",
                to: "cristiansleonardo@gmail.com",
                subject: "Nuevo ticket relacionado a "+findData[0].name,
                html: `<!doctype html>
                    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                    <head>
                        <title>
                        
                        </title>
                        <!--[if !mso]><!-- -->
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <!--<![endif]-->
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style type="text/css">
                        #outlook a { padding:0; }
                        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
                        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
                        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
                        p { display:block;margin:13px 0; }
                        </style>
                        <!--[if mso]>
                        <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                        </xml>
                        <![endif]-->
                        <!--[if lte mso 11]>
                        <style type="text/css">
                        .outlook-group-fix { width:100% !important; }
                        </style>
                        <![endif]-->
                        
                    <!--[if !mso]><!-->
                        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
                <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
                        <style type="text/css">
                        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
                        </style>
                    <!--<![endif]-->
                
                    
                        
                    <style type="text/css">
                    @media only screen and (max-width:480px) {
                        .mj-column-per-100 { width:100% !important; max-width: 100%; }
                    }
                    </style>
                    
                
                        <style type="text/css">
                        
                        
                
                    @media only screen and (max-width:480px) {
                    table.full-width-mobile { width: 100% !important; }
                    td.full-width-mobile { width: auto !important; }
                    }
                
                        </style>
                        <style type="text/css">.hide_on_mobile { display: none !important;} 
                        @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
                        .hide_section_on_mobile { display: none !important;} 
                        @media only screen and (min-width: 480px) { 
                            .hide_section_on_mobile { 
                                display: table !important;
                            } 
                
                            div.hide_section_on_mobile { 
                                display: block !important;
                            }
                        }
                        .hide_on_desktop { display: block !important;} 
                        @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
                        .hide_section_on_desktop { 
                            display: table !important;
                            width: 100%;
                        } 
                        @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
                        
                        p, h1, h2, h3 {
                            margin: 0px;
                        }
                
                        ul, li, ol {
                            font-size: 11px;
                            font-family: Ubuntu, Helvetica, Arial;
                        }
                
                        a {
                            text-decoration: none;
                            color: inherit;
                        }
                
                        @media only screen and (max-width:480px) {
                
                            .mj-column-per-100 { width:100%!important; max-width:100%!important; }
                            .mj-column-per-100 > .mj-column-per-75 { width:75%!important; max-width:75%!important; }
                            .mj-column-per-100 > .mj-column-per-60 { width:60%!important; max-width:60%!important; }
                            .mj-column-per-100 > .mj-column-per-50 { width:50%!important; max-width:50%!important; }
                            .mj-column-per-100 > .mj-column-per-40 { width:40%!important; max-width:40%!important; }
                            .mj-column-per-100 > .mj-column-per-33 { width:33.333333%!important; max-width:33.333333%!important; }
                            .mj-column-per-100 > .mj-column-per-25 { width:25%!important; max-width:25%!important; }
                
                            .mj-column-per-100 { width:100%!important; max-width:100%!important; }
                            .mj-column-per-75 { width:100%!important; max-width:100%!important; }
                            .mj-column-per-60 { width:100%!important; max-width:100%!important; }
                            .mj-column-per-50 { width:100%!important; max-width:100%!important; }
                            .mj-column-per-40 { width:100%!important; max-width:100%!important; }
                            .mj-column-per-33 { width:100%!important; max-width:100%!important; }
                            .mj-column-per-25 { width:100%!important; max-width:100%!important; }
                        }
                        #tab {
                        font-family: arial, sans-serif !important;
                        border-collapse: collapse !important;
                        color: black !important;
                        width: 50% !important;
                        }
                
                        .tdd, .thh {
                        border: 1px solid #dddddd !important;
                        text-align: left !important;
                        color: black !important;
                        padding: 8px !important;
                        }
                
                        .thh {
                        background-color: #3598db82 !important;
                        color: black !important;
                        }
                        </style>
                        
                    </head>
                    <body style="background-color:transparent;">
                        
                        
                    <div style="background-color:transparent;">
                        
                    
                    <!--[if mso | IE]>
                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                    >
                        <tr>
                        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <![endif]-->
                    
                    
                    <div style="background:transparent;background-color:transparent;margin:0px auto;max-width:600px;">
                        
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;background-color:transparent;width:100%;">
                        <tbody>
                            <tr>
                            <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;">
                                <!--[if mso | IE]>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                
                        <tr>
                    
                            <td
                            class="" style="vertical-align:top;width:600px;"
                            >
                        <![endif]-->
                            
                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                        
                            <tr>
                            <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                        <tbody>
                        <tr>
                            <td style="width:120px;">
                            
                    <img height="auto" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/629a28c01171e/1654270442.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="120">
                    
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    
                            </td>
                            </tr>
                        
                            <tr>
                            <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                
                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><h2 style="font-size: 17px; font-family: Ubuntu, Helvetica, Arial; text-align: center;">Se ha generado un nuevo ticket relacionado a <span style="color: #3598db;">NOMBRE_CLIENTE</span></h2></div>
                    
                            </td>
                            </tr>
                        
                            <tr>
                            <td style="font-size:0px;padding:10px 10px;padding-top:10px;padding-right:10px;word-break:break-word;">
                                
                    <p style="font-family: Ubuntu, Helvetica, Arial; border-top: solid 1px #000000; font-size: 1; margin: 0px auto; width: 100%;">
                    </p>
                    
                    <!--[if mso | IE]>
                        <table
                        align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #000000;font-size:1;margin:0px auto;width:580px;" role="presentation" width="580px"
                        >
                        <tr>
                            <td style="height:0;line-height:0;">
                            &nbsp;
                            </td>
                        </tr>
                        </table>
                    <![endif]-->
                    
                    
                            </td>
                            </tr>
                        
                            <tr>
                            <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                
                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><h1 style="font-family: 'Cabin', sans-serif; font-size: 22px; text-align: center;"><span style="color: #3598db;"><strong>Detalles del ticket</strong></span></h1></div>
                    
                            </td>
                            </tr>
                        
                    </table>
                    
                    </div>
                    
                        <!--[if mso | IE]>
                            </td>
                        
                        </tr>
                    
                                </table>
                                <![endif]-->
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        
                    </div>
                    
                    
                    <!--[if mso | IE]>
                        </td>
                        </tr>
                    </table>
                    <![endif]-->
                    
                    
                    </div>
                    <center>
                        <table id="tab">
                        <tr class="trr">
                        <th class="thh">Cliente</th>
                        <td class="tdd">${findData[0].name}</td>
                        
                        </tr>
                        <tr class="trr">
                        <th class="thh">Sitio</th>
                        <td class="tdd">${item.site}</td>
                        
                        </tr>
                
                        <tr class="trr">
                        <th class="thh">Tipo de equipo</th>
                        <td class="tdd">PC</td>
                        
                        </tr>
                
                        <tr class="trr">
                        <th class="thh">IP Dispositivo</th>
                        <td class="tdd">${item.ip}</td>
                        
                        </tr>
                
                        <tr class="trr">
                        <th class="thh">Clasificación</th>
                        <td class="tdd">DOWN</td>
                        
                        </tr>
                
                        <tr class="trr">
                        <th class="thh">Fecha de caída</th>
                        <td class="tdd">${new Date()}</td>
                        
                        </tr>
                    </table>
                    </center>
                    
                    </body>
                    </html>
                `
            }
            if (item.monitoring) {
                try{
                    const createTicket = await Ticket.create(data)
                    if (createTicket) {
                            var socket = req.app.get('io');
                            socket.emit('ticket', 'world');
                        res.json(createTicket)
                    }
                }catch(err){
                    console.log(err)
                    res.json(err)
                }
            }else{
                res.json({status: "Not monitoring"})
            }
            
        }
    } catch (err) {
        console.log(err)
    }
    // const data = req.body.data
    
})

tickets.post('/sendsms', async (req, res) => {
    data = {
        client:req.body.client,
        site: req.body
    }
    // Load the twilio module
    var twilio = require('twilio');

    // Create a new REST API client to make authenticated requests against the
    // twilio back end
    var client = new twilio("AC17b30add52d8f5f76436da678625e05d", "bcf168ea09cf822c3397d21bad9da2c9");

    // Pass in parameters to the REST API using an object literal notation. The
    // REST client will handle authentication and response serialzation for you.
    client.messages.create({
        to:'+584123462686',
        from:'+19342028073',
        body:'ahoy hoy! Testing Twilio and node.js'
    }, function(error, message) {
        // The HTTP request to Twilio will run asynchronously. This callback
        // function will be called when a response is received from Twilio
        // The "error" variable will contain error information, if any.
        // If the request was successful, this value will be "falsy"
        if (!error) {
            // The second argument to the callback will contain the information
            // sent back by Twilio for the request. In this case, it is the
            // information about the text messsage you just sent:
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);

            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log('Oops! There was an error.');
        }
    });
})

module.exports = tickets