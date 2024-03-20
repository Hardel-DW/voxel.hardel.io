import {column, defineDb, defineTable, NOW} from 'astro:db';

const WaitList = defineTable({
    columns: {
        id: column.number({primaryKey: true}),
        email: column.text({unique: true}),
        createdAt: column.date({default: NOW})
    }
})

export default defineDb({
    tables: {
        WaitList
    }
});
