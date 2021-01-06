const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('Tools', () => {
    afterEach(async () => {
        await mongoose.model('Tool').deleteMany({});
    });

    afterAll(async (done) => {
        mongoose.connection.close();
    });

    it ('should be able to create a new tool', async () => {
        const newToolData = {
            tags: ["very", "useful", "tool"],
            title: 'Test Tool',
            link: "https://tool.com.br",
            description: "A very useful tool.",
        };

        const response = await request(app)
            .post('/tools')
            .send(newToolData);

        expect(response.body).toHaveProperty('_id');
        expect(response.body).toMatchObject(newToolData);
    });

    it ('should not be able to create a new tool without required fields', async () => {
        await request(app)
            .post('/tools')
            .send({
                tags: ["very", "useful", "tool"],
                link: "https://tool.com.br",
                description: "A very useful tool."
            })
            .expect(400);

        await request(app)
            .post('/tools')
            .send({
                tags: ["very", "useful", "tool"],
                title: 'Test Tool',
                description: "A very useful tool."
            })
            .expect(400);
    });

    it('should be able to update an existent tool', async () => {
        const response = await request(app)
            .post('/tools')
            .send({
                tags: ["very", "useful", "tool"],
                title: 'Test Tool',
                link: "https://tool.com.br",
                description: "A very useful tool.",
            });

        const updatedResponse = await request(app)
            .put(`/tools/${response.body._id}`)
            .send({
                title: 'Updated Tool',
                link: 'https://toolupdated.com.br'
            });

        expect(updatedResponse.body).toMatchObject({
            tags: ["very", "useful", "tool"],
            title: 'Updated Tool',
            link: 'https://toolupdated.com.br',
            description: "A very useful tool."
        });
    });

    it('should not be able to update a tool that not exists', async () => {
        await request(app)
            .put('/tools/123')
            .send({ title: 'Updated Tool', link: 'https://toolupdated.com.br' })
            .expect(400);
    });

    it ('should be able to list the tools', async () => {
        const firstTool = {
            tags: ["very", "useful", "tool"],
            title: 'Test Tool',
            link: "https://tool.com.br",
            description: "A very useful tool.",
        };

        const secondTool = {
            tags: ["another", "very", "useful", "tool"],
            title: 'Test Antoher Tool',
            link: "https://anothertool.com.br",
            description: "Another very useful tool.", 
        }

        await request(app)
            .post('/tools')
            .send(firstTool);

        await request(app)
            .post('/tools')
            .send(secondTool);

        const response = await request(app).get('/tools');

        expect(response.body).toMatchObject([firstTool, secondTool]);
    });

    it ('should be able to filter a tool by tags', async () => {
        const firstTool = {
            tags: ["very", "useful", "tool"],
            title: 'Test Tool',
            link: "https://tool.com.br",
            description: "A very useful tool.",
        };

        const secondTool = {
            tags: ["another", "very", "useful", "tool"],
            title: 'Test Antoher Tool',
            link: "https://anothertool.com.br",
            description: "Another very useful tool.", 
        }

        await request(app)
            .post('/tools')
            .send(firstTool);

        await request(app)
            .post('/tools')
            .send(secondTool);

        const firstResponse = await request(app)
            .get('/tools')
            .query({ tag: 'another' });

        expect(firstResponse.body).toMatchObject([ secondTool ]);

        const secondResponse = await request(app)
            .get('/tools')
            .query({ tag: 'very,useful,tool' });

            expect(secondResponse.body).toMatchObject([ firstTool, secondTool ]);
    });

    it ('should be able to delete a tool', async () => {
        const response = await request(app)
            .post('/tools')
            .send({
                tags: ["very", "useful", "tool"],
                title: 'Test Tool',
                link: "https://tool.com.br",
                description: "A very useful tool.",
            });

        await request(app)
            .delete(`/tools/${response.body._id}`)
            .expect(204);
    });

    it ('should not be able to delete a tool that not exists', async () => {
        await request(app)
            .delete('/tools/1234')
            .expect(400);
    });
});