import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { error } from 'node:console';
const db = sql('meals.db');

export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // throw new Error('Failed to fetch meals');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function addMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    const extension = meal.image.name.split('.').pop();
    const filename = `${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), error => {
        if (error) {
            throw new Error('Failed to save image');
        }
    });
    meal.image = `/images/${filename}`;
    db.prepare('INSERT INTO meals (title, summary, instructions, image, creator, creator_email,slug) VALUES (?, ?, ?, ?, ?, ?,?)').run(
        meal.title,
        meal.summary,
        meal.instructions,
        meal.image,
        meal.creator,
        meal.creator_email,
        meal.slug
    );
}