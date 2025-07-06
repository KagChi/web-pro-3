<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Create 20 products without using factory
        for ($i = 0; $i < 20; $i++) {
            Product::create([
                'title' => $faker->randomElement([
                    'Semen Portland',
                    'Pipa PVC 4 inch',
                    'Cat Tembok',
                    'Pasir Beton',
                    'Bata Merah',
                    'Keramik Lantai',
                    'Paku Beton',
                    'Kawat Bendrat',
                    'Semen Gresik',
                    'Pipa Galvanis',
                    'Cat Anti Bocor',
                    'Pasir Pasang',
                    'Bata Ringan',
                    'Keramik Dinding',
                    'Paku Kayu',
                    'Kawat Bronjong',
                    'Semen Holcim',
                    'Pipa PPR',
                    'Cat Epoxy',
                    'Pasir Urug'
                ]),
                'desc' => $faker->paragraph(2),
                'price' => $faker->numberBetween(25000, 500000),
                'image' => 'products/' . $faker->randomElement([
                    'semen.jpg',
                    'pipa.jpg',
                    'cat.jpg',
                    'pasir.jpg',
                    'bata.jpg',
                    'keramik.jpg',
                    'paku.jpg',
                    'kawat.jpg'
                ])
            ]);
        }

        // Generate sample images for products
        $imageNames = [
            'semen.jpg',
            'pipa.jpg',
            'cat.jpg',
            'pasir.jpg',
            'bata.jpg',
            'keramik.jpg',
            'paku.jpg',
            'kawat.jpg',
            'semen-gresik.jpg',
            'pipa-galanis.jpg',
            'cat-anti-bocor.jpg',
            'pasir-pasang.jpg',
            'bata-ringan.jpg',
            'keramik-dinding.jpg',
            'paku-kayu.jpg',
            'kawat-bronjong.jpg',
            'semen-holcim.jpg',
            'pipa-ppr.jpg',
            'cat-epoxy.jpg',
            'pasir-urug.jpg'
        ];

        // Create products directory if it doesn't exist
        $productsDir = storage_path('app/public/products');
        if (!file_exists($productsDir)) {
            mkdir($productsDir, 0755, true);
        }

        // Generate sample images using GD
        foreach ($imageNames as $imageName) {
            $imagePath = $productsDir . '/' . $imageName;
            if (!file_exists($imagePath)) {
                // Create a simple colored image using GD
                $width = 400;
                $height = 300;
                $image = imagecreate($width, $height);

                // Generate random colors
                $bgColor = imagecolorallocate(
                    $image,
                    $faker->numberBetween(200, 255),
                    $faker->numberBetween(200, 255),
                    $faker->numberBetween(200, 255)
                );
                $textColor = imagecolorallocate(
                    $image,
                    $faker->numberBetween(0, 100),
                    $faker->numberBetween(0, 100),
                    $faker->numberBetween(0, 100)
                );

                // Fill background
                imagefill($image, 0, 0, $bgColor);

                // Add text
                $text = str_replace('.jpg', '', $imageName);
                $text = str_replace('-', ' ', $text);
                $text = ucwords($text);

                // Calculate text position to center it
                $fontSize = 5;
                $textWidth = imagefontwidth($fontSize) * strlen($text);
                $textHeight = imagefontheight($fontSize);
                $x = ($width - $textWidth) / 2;
                $y = ($height - $textHeight) / 2;

                imagestring($image, $fontSize, $x, $y, $text, $textColor);

                // Save image
                imagejpeg($image, $imagePath, 80);
                imagedestroy($image);
            }
        }
    }
}
