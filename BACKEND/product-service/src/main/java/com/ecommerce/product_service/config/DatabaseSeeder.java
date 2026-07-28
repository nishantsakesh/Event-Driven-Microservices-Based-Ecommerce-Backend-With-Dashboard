package com.ecommerce.product_service.config;

import com.ecommerce.product_service.entity.Product;
import com.ecommerce.product_service.entity.ProductCategory;
import com.ecommerce.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

//@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            seedProducts();
        }
    }

    private void seedProducts() {
        List<Product> products = Arrays.asList(
                // --- HIGH-END AUDIOPHILE PRODUCTS ---
                createProduct("Sennheiser HD 800 S", "Sennheiser", ProductCategory.HEADPHONE, "1799.00", 15, "The undisputed gold standard for ultra-wide soundstage and classical music tracking.", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"),
                createProduct("Focal Bathys", "Focal", ProductCategory.HEADPHONE, "799.00", 25, "The highest-rated active noise-canceling (ANC) wireless headphone built with true high-fidelity French dynamic drivers.", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"),
                createProduct("HiFiMAN Ananda Nano", "HiFiMAN", ProductCategory.HEADPHONE, "599.00", 30, "An outstanding mid-tier planar magnetic option recognized for extreme speed, detail retrieval, and immense value.", "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80"),
                createProduct("Sennheiser IE 900", "Sennheiser", ProductCategory.EARPHONE, "1499.00", 10, "A masterfully engineered single-dynamic driver IEM celebrated for phenomenal clarity and textured bass response.", "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80"),
                createProduct("ThieAudio Monarch MKIII", "ThieAudio", ProductCategory.EARPHONE, "999.00", 12, "A powerhouse tribrid (Electrostatic + Balanced Armature + Dynamic) setup that dominates community recommendation lists.", "https://images.unsplash.com/photo-1606220588913-b3eea4ce44e1?w=800&q=80"),
                createProduct("Sennheiser IE 200", "Sennheiser", ProductCategory.EARPHONE, "149.00", 45, "The best entry-level gateway for budding audiophiles seeking balanced tuning without high investment.", "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"),
                createProduct("Sony WF-1000XM5", "Sony", ProductCategory.EARBUDS, "298.00", 50, "The baseline market leader for everyday lifestyle users, offering elite ANC paired with clean LDAC wireless high-res playback.", "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&q=80"),
                createProduct("Devialet Gemini II", "Devialet", ProductCategory.EARBUDS, "449.00", 18, "A luxury wireless earbud bringing French high-end speaker engineering into a portable, deep-bass package.", "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800&q=80"),
                createProduct("Final Audio ZE8000 MK2", "Final Audio", ProductCategory.EARBUDS, "399.00", 22, "Specifically tuned for pure acoustic separation ('8K Sound') rather than just tech features, a favorite for audio purists.", "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&q=80"),
                createProduct("KEF LS50 Wireless II", "KEF", ProductCategory.SPEAKER, "2799.00", 8, "Acclaimed active bookshelf speakers using the iconic Uni-Q driver array for razor-sharp vocal imaging.", "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"),
                createProduct("Klipsch RP-600M II", "Klipsch", ProductCategory.SPEAKER, "749.00", 15, "Highly efficient, energetic, and beautifully horn-loaded bookshelf units loved by rock and vinyl enthusiasts.", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"),
                createProduct("Dali Oberon 5", "Dali", ProductCategory.SPEAKER, "1299.00", 10, "Elegant, compact floorstanding speakers engineered with low-distortion wood fiber cones.", "https://images.unsplash.com/photo-1520170350707-b2da59970118?w=800&q=80"),
                createProduct("Sennheiser AMBEO Soundbar Max", "Sennheiser", ProductCategory.SOUNDBAR, "2499.00", 5, "Widely considered the absolute best all-in-one home cinema system, replicating a true 5.1.4 setup without separate satellite boxes.", "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"),
                createProduct("Sonos Arc Ultra", "Sonos", ProductCategory.SOUNDBAR, "999.00", 25, "The best overall ecosystem soundbar for casual premium buyers wanting Dolby Atmos spatial mapping.", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"),
                createProduct("Sennheiser AMBEO Soundbar Plus", "Sennheiser", ProductCategory.SOUNDBAR, "1499.00", 12, "A slightly more compact 7.1.4 alternative that utilizes self-calibration to adjust cleanly to tight room spaces.", "https://images.unsplash.com/photo-1520170350707-b2da59970118?w=800&q=80"),
                createProduct("Audeze Maxwell", "Audeze", ProductCategory.HEADSET, "299.00", 40, "The undisputed king of premium headsets. It runs on massive 90mm planar magnetic drivers and delivers detailed audio quality unmatched by generic gaming brands.", "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80"),
                createProduct("Sennheiser HD 490 Pro", "Sennheiser", ProductCategory.HEADSET, "399.00", 25, "A phenomenal open-back professional mixing headset that doubles as a zero-fatigue spatial tracking tool.", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"),
                createProduct("Audio-Technica ATH-GDL3", "Audio-Technica", ProductCategory.HEADSET, "129.00", 50, "An incredibly lightweight, open-back headset providing a massive soundstage perfect for competitive tactical listening.", "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&q=80"),

                // HEADPHONES (10)
                createProduct("Sony WH-1000XM5", "Sony", ProductCategory.HEADPHONE, "348.00", 50, "Industry leading noise canceling wireless headphones.", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"),
                createProduct("Sennheiser HD 800 S", "Sennheiser", ProductCategory.HEADPHONE, "1799.95", 10, "Reference-class audiophile headphones.", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"),
                createProduct("Bose QuietComfort 45", "Bose", ProductCategory.HEADPHONE, "329.00", 75, "Iconic quiet. Comfort. And sound.", "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80"),
                createProduct("Audio-Technica ATH-M50x", "Audio-Technica", ProductCategory.HEADPHONE, "169.00", 100, "Professional studio monitor headphones.", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80"),
                createProduct("Beyerdynamic DT 770 PRO", "Beyerdynamic", ProductCategory.HEADPHONE, "159.00", 60, "Closed over-ear headphones for professional sound.", "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80"),
                createProduct("Focal Clear Mg", "Focal", ProductCategory.HEADPHONE, "1499.00", 15, "Open-back high-fidelity headphones.", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"),
                createProduct("Hifiman Sundara", "Hifiman", ProductCategory.HEADPHONE, "299.00", 40, "Planar magnetic over-ear headphones.", "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=800&q=80"),
                createProduct("Meze 99 Classics", "Meze", ProductCategory.HEADPHONE, "309.00", 30, "Walnut wood over-ear headphones.", "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?w=800&q=80"),
                createProduct("Audeze LCD-X", "Audeze", ProductCategory.HEADPHONE, "1199.00", 20, "Creator edition planar magnetic headphones.", "https://images.unsplash.com/photo-1588600878108-578307a3cc9d?w=800&q=80"),
                createProduct("Apple AirPods Max", "Apple", ProductCategory.HEADPHONE, "549.00", 120, "High-fidelity audio. Active Noise Cancellation.", "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&q=80"),

                // EARBUDS (10)
                createProduct("Apple AirPods Pro 2", "Apple", ProductCategory.EARBUDS, "249.00", 200, "Rich audio and next-level noise cancellation.", "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80"),
                createProduct("Sony WF-1000XM5", "Sony", ProductCategory.EARBUDS, "298.00", 150, "The best truly wireless noise canceling earbuds.", "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"),
                createProduct("Bose QuietComfort Earbuds II", "Bose", ProductCategory.EARBUDS, "279.00", 100, "Personalized noise cancellation and sound performance.", "https://images.unsplash.com/photo-1598331668826-20cefac91461?w=800&q=80"),
                createProduct("Sennheiser Momentum True Wireless 3", "Sennheiser", ProductCategory.EARBUDS, "249.95", 80, "Inspired by music. Perfected by Sennheiser.", "https://images.unsplash.com/photo-1606220588913-b3aecb4b27a0?w=800&q=80"),
                createProduct("Beats Fit Pro", "Beats", ProductCategory.EARBUDS, "199.99", 120, "True wireless noise cancelling earbuds.", "https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=800&q=80"),
                createProduct("Jabra Elite 8 Active", "Jabra", ProductCategory.EARBUDS, "199.99", 90, "The world's toughest earbuds.", "https://images.unsplash.com/photo-1572569533902-136706ec954e?w=800&q=80"),
                createProduct("Samsung Galaxy Buds2 Pro", "Samsung", ProductCategory.EARBUDS, "229.99", 140, "24-bit Hi-Fi audio. Ultimate fit.", "https://images.unsplash.com/photo-1631867670732-c513251a37c5?w=800&q=80"),
                createProduct("Google Pixel Buds Pro", "Google", ProductCategory.EARBUDS, "199.99", 110, "Premium wireless earbuds with Active Noise Cancellation.", "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=800&q=80"),
                createProduct("Bowers & Wilkins Pi7 S2", "Bowers & Wilkins", ProductCategory.EARBUDS, "399.00", 40, "True wireless earbuds with industry-leading sound.", "https://images.unsplash.com/photo-1582236592237-7756f1406856?w=800&q=80"),
                createProduct("Nothing Ear (2)", "Nothing", ProductCategory.EARBUDS, "149.00", 85, "Ultra light. High-res audio.", "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80"),

                // SPEAKERS (10)
                createProduct("Sonos Era 300", "Sonos", ProductCategory.SPEAKER, "449.00", 50, "Premium smart speaker with spatial audio.", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"),
                createProduct("KEF LS50 Wireless II", "KEF", ProductCategory.SPEAKER, "2799.00", 10, "High-fidelity active stereo speakers.", "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"),
                createProduct("JBL Charge 5", "JBL", ProductCategory.SPEAKER, "179.95", 200, "Portable waterproof speaker with powerbank.", "https://images.unsplash.com/photo-1610660608552-3d8da2a4d3ec?w=800&q=80"),
                createProduct("Bose SoundLink Revolve+ II", "Bose", ProductCategory.SPEAKER, "329.00", 80, "Portable Bluetooth speaker with 360 sound.", "https://images.unsplash.com/photo-1520623192231-610ee3a8cb7d?w=800&q=80"),
                createProduct("Marshall Stanmore III", "Marshall", ProductCategory.SPEAKER, "379.99", 60, "Bluetooth home speaker with iconic design.", "https://images.unsplash.com/photo-1549429532-68045620853f?w=800&q=80"),
                createProduct("Devialet Phantom I 108 dB", "Devialet", ProductCategory.SPEAKER, "3199.00", 5, "Implosive sound center. Ultra-dense sound.", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"),
                createProduct("Ultimate Ears MEGABOOM 3", "Ultimate Ears", ProductCategory.SPEAKER, "199.99", 120, "Powerful, portable wireless Bluetooth speaker.", "https://images.unsplash.com/photo-1589003071536-46c59c55b6a7?w=800&q=80"),
                createProduct("Bowers & Wilkins Zeppelin", "Bowers & Wilkins", ProductCategory.SPEAKER, "799.00", 30, "Wireless smart speaker with high-res stereo.", "https://images.unsplash.com/photo-1596707328905-1a87c1be27dc?w=800&q=80"),
                createProduct("Klipsch The Fives", "Klipsch", ProductCategory.SPEAKER, "799.00", 40, "Powered monitor speakers with HDMI-ARC.", "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"),
                createProduct("Yamaha HS8", "Yamaha", ProductCategory.SPEAKER, "399.00", 90, "8-inch powered studio monitor (single).", "https://images.unsplash.com/photo-1525048201201-90a424dd40ac?w=800&q=80"),

                // HEADSETS (10)
                createProduct("SteelSeries Arctis Nova Pro Wireless", "SteelSeries", ProductCategory.HEADSET, "349.99", 70, "Premium wireless gaming headset.", "https://images.unsplash.com/photo-1612282130134-4b68ce8858a7?w=800&q=80"),
                createProduct("Astro A50 Gen 4", "Astro Gaming", ProductCategory.HEADSET, "299.99", 80, "Wireless gaming headset and base station.", "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80"),
                createProduct("Razer BlackShark V2 Pro", "Razer", ProductCategory.HEADSET, "199.99", 110, "Esports wireless gaming headset.", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"),
                createProduct("HyperX Cloud III Wireless", "HyperX", ProductCategory.HEADSET, "169.99", 150, "Comfortable gaming headset with great battery life.", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80"),
                createProduct("Logitech G Pro X 2 LIGHTSPEED", "Logitech G", ProductCategory.HEADSET, "249.99", 90, "Wireless gaming headset with graphene drivers.", "https://images.unsplash.com/photo-1612282130134-4b68ce8858a7?w=800&q=80"),
                createProduct("Corsair Virtuoso RGB Wireless XT", "Corsair", ProductCategory.HEADSET, "269.99", 60, "High-fidelity gaming headset with Bluetooth.", "https://images.unsplash.com/photo-1588600878108-578307a3cc9d?w=800&q=80"),
                createProduct("EPOS H6PRO", "EPOS", ProductCategory.HEADSET, "179.00", 75, "Closed acoustic gaming headset.", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"),
                createProduct("Turtle Beach Stealth Pro", "Turtle Beach", ProductCategory.HEADSET, "329.99", 50, "Multi-platform wireless noise-cancelling gaming headset.", "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80"),
                createProduct("Sony INZONE H9", "Sony", ProductCategory.HEADSET, "299.99", 85, "Wireless noise canceling gaming headset.", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"),
                createProduct("Beyerdynamic MMX 300 (2nd Gen)", "Beyerdynamic", ProductCategory.HEADSET, "299.00", 40, "Premium gaming headset for PC and console.", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80")
        );

        productRepository.saveAll(products);
        System.out.println("Seeded 40 products into the database.");
    }

    private Product createProduct(String name, String brand, ProductCategory category, String price, Integer quantity, String description, String imageUrl) {
        return Product.builder()
                .name(name)
                .brand(brand)
                .category(category)
                .price(new BigDecimal(price))
                .quantity(quantity)
                .description(description)
                .imageUrl(imageUrl)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }
}
