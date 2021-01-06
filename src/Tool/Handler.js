const Tool = require('./Model');

module.exports =  {
    create: async (request, response) => {
        try {
            
            const tool = request.body;

            return response.status(201).json(await Tool.create(tool));

        } catch (error) {
            return response.status(400).json({ error: true, message: error.message });
        }
    },

    update: async (request, response) => {
        try {

            const { id } = request.params;
    
            const tool = await Tool.findByIdAndUpdate(id, request.body, { new: true });
    
            return response.json(tool);
        
        } catch (error) {
            return response.status(400).json({ error: true, message: error.message });
        }
    },

    get: async (request, response) => {
        const { page = 1 } = request.query;
        const { limit = 30 } = request.query;
        
        const tags = request.query.tag;
        
        let filters = {};
        if (tags) {
            filters = {
                tags: {
                    $all: tags.split(',').map(tag => tag.trim())
                }
            };
        }

        const tools = await Tool.paginate(filters, { page, limit });

        return response.json(tools.docs);
    },

    delete: async (request, response) => {
        try {

            const { id } = request.params;

            const deleted = await Tool.findByIdAndDelete(id);

            if (! deleted) {
                return response.status(400).json({ error: true, message: 'Tool not found.' });
            }

            return response.status(204).send();

        } catch (error) {
            return response.status(400).json({ error: true, message: error.message });
        }
    }
};