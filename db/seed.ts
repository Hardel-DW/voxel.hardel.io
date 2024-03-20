import {db, WaitList} from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
    await db.insert(WaitList).values({
        email: "voxel.hardel@gmail.com"
    })
}
