// /api/comments/comment-id
import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util';

async function handler(req, res) {
    const eventId = req.query.eventId;

    let client;

    try {
        client = await connectDatabase();
    } catch (err) {
        res.status(500).json({ message: 'Connecting to the database faield!' });
        return;
    }

    if (req.method === 'POST') {
        // add server-side validation
        const { email, name, text } = req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            // 422 stand for invalid input
            res.status(422).json({ message: 'Invalid input.' });
            client.close();
            return;
        }

        const newComment = {
            email: email,
            name: name,
            text: text,
            eventId: eventId,
        };

        try {
            let result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;

            res.status(201).json({ message: 'Added comment.', comment: newComment });

        } catch (err) {
            res.status(500).json({ message: 'Inserting comment failed' });
        }
        // result return back unique id
    }

    if (req.method === 'GET') {
        try {
            let documents = await getAllDocuments(
                client,
                'comments',
                { _id: -1 },// decending order with minus 1
                { eventId: eventId }
            );
            res.status(200).json({ comments: documents });
        } catch (err) {
            res.status(500).json({ message: 'Getting comments failed' });
        }
    }

    client.close();
}

export default handler;
