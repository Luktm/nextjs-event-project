import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;
        const client = await connectDatabase();

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: "Invalid email address" });
            return;
        }

        try {

        } catch (error) {
            return res.status(500).json({ message: 'Connecting to the database failed!' });
        }

        try {
            await insertDocument(client, 'newsletter',{ email: userEmail })
            client.close();
        } catch (error) {
            return res.status(500).json({ message: 'Inserting data failed!' });
        }

        res.status(201).json({ message: 'Signed up' });
    }
}

export default handler;
