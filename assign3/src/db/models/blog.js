class Blog {
    static create(data) {
        const now = new Date();

        if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
            throw new Error('Title is required and must be a non-empty string');
        }

        if (!data.author || typeof data.author !== 'string' || data.author.trim() === '') {
            throw new Error('Author is required and must be a non-empty string');
        }

        const blog = {
            title: data.title.trim(),
            body: data.body,
            author: data.author,
            creatdAt: now,
        };

        if (data._id) {
            blog._id = data._id;
        }

        return blog;
    }

    static prepareUpdate(updates) {
        const $set = {};
        const now = new Date();


        if ('title' in updates) {
            if (typeof updates.title !== 'string' || updates.title.trim() === '') {
                throw new Error('Title must be a non-empty string');
            }
            $set.title = updates.title.trim();
        }

        if ('author' in updates) {
            if (typeof updates.author !== 'string' || updates.author.trim() === '') {
                throw new Error('Author must be a non-empty string');
            }
            $set.author = updates.author.trim();
        }

        if ('body' in updates) {
            if (typeof updates.body !== 'string') {
                throw new Error('Author must be a string');
            }
            $set.body = updates.body.trim();
        }

        if (Object.keys($set).length === 0) {
            return null;
        }

        return {
            $set
        };
    }
    static collectionName = 'blogs';
}

module.exports = Blog;