class Task {
    static create(data) {
        const now = new Date();

        if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
            throw new Error('Title is required and must be a non-empty string');
        }

        const task = {
            title: data.title.trim(),
            completed: !!data.completed,          // приводим к boolean
            createdAt: now,
            updatedAt: now,
        };

        if (data._id) {
            task._id = data._id;
        }

        return task;
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

        if ('completed' in updates) {
            $set.completed = !!updates.completed;
        }

        if (Object.keys($set).length === 0) {
            return {};
        }

        return {
            $set,
            $currentDate: { updatedAt: true }
        };
    }
    static collectionName = 'tasks';
}

module.exports = Task;