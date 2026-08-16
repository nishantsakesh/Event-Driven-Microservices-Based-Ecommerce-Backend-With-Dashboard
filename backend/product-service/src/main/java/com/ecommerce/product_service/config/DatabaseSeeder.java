package com.ecommerce.product_service.config;

import com.ecommerce.product_service.entity.Product;
import com.ecommerce.product_service.entity.ProductCategory;
import com.ecommerce.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            seedProducts();
        } else {
            System.out.println("[DatabaseSeeder] Products already exist (" + productRepository.count() + "). Skipping automated seeding.");
        }
    }

    private void seedProducts() {
        List<Product> products = new ArrayList<>();

        // 1. HEADPHONES
        products.add(createProduct(
                "Sennheiser HD 800 S",
                "Sennheiser",
                ProductCategory.HEADPHONE,
                "159990.00",
                15,
                "The undisputed reference gold standard in open-back dynamic headphones. Featuring the iconic 56mm Ring Radiator transducer system engineered to deliver an unmatched, hyper-realistic spatial soundstage with pinpoint imaging.",
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "56mm Ring Radiator dynamic transducers — largest ever used in dynamic headphones",
                        "Acoustic absorber system prevents masking of high frequencies",
                        "Open-back earcups angled forward for natural spatial positioning",
                        "Handcrafted microfiber ear pads for zero fatigue during extended sessions",
                        "Symmetrical 4.4mm Pentaconn and 6.35mm gold-plated precision cables"
                ),
                List.of(
                        "Industry-leading holographic soundstage width & depth",
                        "Ultra-low harmonic distortion: < 0.02% @ 1 kHz",
                        "Made in Germany at Sennheiser state-of-the-art facility",
                        "2-Year International Manufacturer Warranty"
                ),
                List.of("Sennheiser HD 800 S Headphone", "6.35mm Unbalanced Cable (3m)", "4.4mm Balanced Pentaconn Cable (3m)", "USB Flash Drive with Diffuse-Field Frequency Certificate", "Hard Storage Display Case", "Microfiber Cleaning Cloth"),
                List.of(
                        spec("Frequency Response", "4 Hz - 51,000 Hz (-10 dB)"),
                        spec("Impedance", "300 Ohms"),
                        spec("THD (Total Harmonic Distortion)", "< 0.02% (1 kHz, 100 dB SPL)"),
                        spec("Transducer Principle", "Dynamic, Open-back"),
                        spec("Weight", "330 g (without cable)"),
                        spec("Connector", "6.35 mm Stereo / 4.4 mm Balanced Pentaconn")
                )
        ));

        products.add(createProduct(
                "Focal Bathys Wireless ANC",
                "Focal",
                ProductCategory.HEADPHONE,
                "69990.00",
                20,
                "Focal's flagship audiophile Bluetooth headphone with active noise cancellation and integrated USB-DAC mode delivering uncompressed 24-bit/192kHz resolution straight from your device.",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "40mm Aluminum/Magnesium 'M'-shaped dome dynamic drivers made in France",
                        "Integrated USB-DAC Mode supporting up to 24-bit / 192 kHz high-res audio",
                        "Silent and Soft Active Noise Cancellation modes with transparent hearing",
                        "Over 30 hours battery life with fast-charging (5 hours in 15 minutes)",
                        "Genuine leather headband and memory foam earcups with backlit logo"
                ),
                List.of(
                        "Audiophile-grade French acoustic engineering in a wireless form factor",
                        "Lossless wired USB-C audio mode",
                        "Bluetooth 5.1 with multipoint & aptX Adaptive",
                        "Custom EQ via Focal & Naim companion app"
                ),
                List.of("Focal Bathys Headphone", "Rigid Carrying Case", "1.2m USB-C to USB-C Cable", "1.2m 3.5mm Audio Jack Cable", "Quick Start Guide"),
                List.of(
                        spec("Driver Type", "40mm Aluminum-Magnesium 'M'-shape dome"),
                        spec("Frequency Response", "15 Hz - 22,000 Hz"),
                        spec("DAC Resolution", "Up to 24-bit / 192 kHz (USB-DAC mode)"),
                        spec("Battery Life", "30 hours (Bluetooth ANC), 35 hours (Jack), 42 hours (USB-DAC)"),
                        spec("Codecs", "aptX Adaptive, aptX, AAC, SBC"),
                        spec("Weight", "350 g")
                )
        ));

        products.add(createProduct(
                "Apple AirPods Max - Space Black",
                "Apple",
                ProductCategory.HEADPHONE,
                "59900.00",
                25,
                "A perfect balance of exhilarating high-fidelity audio and the effortless magic of Apple. Featuring an Apple-designed 40mm dynamic driver and dual H1 headphone chips powering advanced computational audio.",
                "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "Apple-designed 40mm dynamic driver delivers rich, deep bass and accurate mids",
                        "Dual neodymium ring magnet motor minimizes distortion across audible range",
                        "Computational audio powered by dual Apple H1 chips (10 audio cores each)",
                        "Personalized Spatial Audio with dynamic head tracking for theater-like sound",
                        "Knit-mesh canopy and acoustically engineered memory foam ear cushions"
                ),
                List.of(
                        "Active Noise Cancellation with Transparency mode",
                        "Digital Crown for volume, track skipping, and Siri",
                        "Up to 20 hours listening with ANC or Spatial Audio enabled",
                        "Seamless switching across all your Apple ecosystem devices"
                ),
                List.of("AirPods Max - Space Black", "Smart Case", "USB-C to Lightning Cable", "Documentation"),
                List.of(
                        spec("Audio Technology", "Apple dynamic driver, ANC, Spatial Audio"),
                        spec("Chipset", "Apple H1 headphone chip (each ear cup)"),
                        spec("Microphones", "9 microphones total (8 for ANC, 3 for voice pickup)"),
                        spec("Battery Life", "Up to 20 hours on a single charge"),
                        spec("Connectivity", "Bluetooth 5.0"),
                        spec("Weight", "384.8 g")
                )
        ));

        products.add(createProduct(
                "Sony WH-1000XM5 ANC",
                "Sony",
                ProductCategory.HEADPHONE,
                "29990.00",
                40,
                "The industry benchmark for wireless noise cancellation. Equipped with two processors and eight microphones, the WH-1000XM5 redefines distraction-free listening and ultra-clear hands-free calls.",
                "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "Integrated Processor V1 and HD Noise Canceling Processor QN1",
                        "Specially engineered 30mm carbon fiber composite drivers",
                        "LDAC audio coding technology transmitting 3x more data than standard Bluetooth",
                        "4 beamforming microphones with AI noise reduction algorithm for crystal calls",
                        "Soft fit leather with lightweight stepless slider headband"
                ),
                List.of(
                        "Auto NC Optimizer adjusts noise canceling to your wearing conditions & environment",
                        "30 hours battery life with 3-minute quick charge for 3 hours playback",
                        "Speak-to-Chat automatically pauses playback when you start speaking",
                        "Multipoint connection connects up to two Bluetooth devices simultaneously"
                ),
                List.of("Sony WH-1000XM5 Headphone", "Collapsible Carrying Case", "1.2m Headphone Cable", "USB-C Charging Cable"),
                List.of(
                        spec("Driver Unit", "30 mm Carbon Fiber Dome"),
                        spec("Frequency Response", "4 Hz - 40,000 Hz (JEITA)"),
                        spec("Battery Life", "Max. 30 hrs (NC ON), Max. 40 hrs (NC OFF)"),
                        spec("Bluetooth Version", "Bluetooth 5.2 (LDAC, AAC, SBC)"),
                        spec("Weight", "Approx. 250 g")
                )
        ));

        products.add(createProduct(
                "Beyerdynamic DT 1990 PRO",
                "Beyerdynamic",
                ProductCategory.HEADPHONE,
                "49990.00",
                18,
                "Handcrafted in Germany, the DT 1990 PRO open studio reference headphone combines decades of headphone engineering expertise with the latest Tesla 2.0 driver technology for uncompromising precision mastering.",
                "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "45mm dynamic Tesla neodymium drivers delivering high-resolution analytical sound",
                        "Open-back circumaural acoustic design for wide, natural, spatial reproduction",
                        "Two sets of interchangeable velour ear pads for Analytical and Balanced sound profiles",
                        "Robust spring steel headband with replaceable memory foam cushioning",
                        "Single-sided detachable mini-XLR cable with gold-plated connectors"
                ),
                List.of(
                        "Engineered & Handcrafted in Heilbronn, Germany",
                        "Dual acoustic tuning sound signature with included ear pads",
                        "Extremely durable all-metal construction built to last a lifetime",
                        "High power handling capability up to 200 mW"
                ),
                List.of("Beyerdynamic DT 1990 PRO", "Analytical Velour Earpads", "Balanced Velour Earpads", "3m Straight Mini-XLR Cable", "5m Coiled Mini-XLR Cable", "6.35mm Adapter", "Premium Hard Case"),
                List.of(
                        spec("Operating Principle", "Open-back studio reference"),
                        spec("Nominal Impedance", "250 Ohms"),
                        spec("Frequency Response", "5 Hz - 40,000 Hz"),
                        spec("Nominal SPL", "102 dB SPL (1 mW / 500 Hz)"),
                        spec("Max Input Power", "200 mW"),
                        spec("Weight", "370 g (without cable)")
                )
        ));

        // 2. EARPHONES (Wired IEMs)
        products.add(createProduct(
                "Sennheiser IE 900",
                "Sennheiser",
                ProductCategory.EARPHONE,
                "129990.00",
                10,
                "The pinnacle of in-ear audio engineering. The IE 900 features a precision-milled single-piece aluminum housing encasing Sennheiser's proprietary X3R TrueResponse transducer system with triple Helmholtz resonators.",
                "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "X3R Technology: 7mm TrueResponse transducer with 3-chamber resonator system",
                        "Precision-machined five-axis CNC aluminum housing crafted from single block",
                        "Acoustic vortex milled into nozzle for optimal sound wave expansion",
                        "Gold-plated Fidelity+ MMCX connectors with gold-plated cable pins",
                        "Three Para-aramid reinforced cables: 2.5mm, 3.5mm, and 4.4mm balanced"
                ),
                List.of(
                        "Hand-assembled and matched drivers at Sennheiser Germany headquarters",
                        "Unrivaled acoustic transparency, textured sub-bass, and pristine highs",
                        "Extremely low harmonic distortion: 0.05% (94 dB, 1 kHz)",
                        "Includes silicone and memory foam tips in S/M/L sizes"
                ),
                List.of("Sennheiser IE 900 In-Ear Monitors", "3.5mm Unbalanced Cable", "2.5mm Balanced Cable", "4.4mm Pentaconn Balanced Cable", "Silicone & Foam Ear Adapter Sets", "Signed Quality Certificate", "Premium Hard Storage Case"),
                List.of(
                        spec("Transducer Principle", "Single Dynamic 7mm TrueResponse with X3R"),
                        spec("Frequency Response", "5 Hz - 48,000 Hz (-10 dB)"),
                        spec("Impedance", "16 Ohms"),
                        spec("Sound Pressure Level (SPL)", "123 dB (1 kHz, 1 Vrms)"),
                        spec("THD", "< 0.05% (94 dB, 1 kHz)"),
                        spec("Weight", "4 g per earpiece")
                )
        ));

        products.add(createProduct(
                "Sennheiser IE 600",
                "Sennheiser",
                ProductCategory.EARPHONE,
                "59990.00",
                18,
                "Crafted from AMLOY-ZR01 amorphous zirconium using 3D metal printing. The IE 600 features triple the hardness of high-performance steel and delivers neutral, lifelike tone with extraordinary acoustic intimacy.",
                "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "3D-printed housing made from AMLOY-ZR01 amorphous zirconium alloy",
                        "7mm TrueResponse extra-wide band transducer with dual resonator chambers (D2CA)",
                        "Acoustic back volume precisely sculpted for linear bass extension",
                        "Gold-plated Fidelity+ MMCX connectors with para-aramid reinforced cables",
                        "Extreme corrosion and scratch resistance engineered for lifetimes of use"
                ),
                List.of(
                        "Exceptional vocal realism and engaging musical tuning",
                        "Ultra-compact ergonomic shape fits virtually all ear anatomies",
                        "Includes both 3.5mm unbalanced and 4.4mm balanced cables",
                        "Designed in Germany, manufactured at Sennheiser Audiophile facility in Ireland"
                ),
                List.of("Sennheiser IE 600 IEMs", "3.5mm Cable with Gold-Plated MMCX", "4.4mm Balanced Pentaconn Cable", "3 Pairs Silicone Adapters", "3 Pairs Memory Foam Adapters", "Cable Clip", "Premium Compact Case"),
                List.of(
                        spec("Transducer", "7mm TrueResponse Dynamic"),
                        spec("Frequency Response", "4 Hz - 46,500 Hz (-10 dB)"),
                        spec("Impedance", "18 Ohms"),
                        spec("SPL", "118 dB (1 kHz, 1 Vrms)"),
                        spec("Material", "AMLOY-ZR01 3D Printed Zirconium"),
                        spec("Weight", "6 g per earpiece")
                )
        ));

        products.add(createProduct(
                "Sennheiser IE 200",
                "Sennheiser",
                ProductCategory.EARPHONE,
                "12990.00",
                50,
                "The ultimate gateway into true audiophile sound. Packed with Sennheiser's legendary 7mm TrueResponse transducer and a dual-tuning nozzle system for either deep bass or studio-flat accuracy.",
                "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "7mm TrueResponse dynamic transducer delivers virtually zero distortion",
                        "Dual-tuning ear tips allow switching between analytical bass and rich sub-bass",
                        "Ultra-compact ergonomic earpiece design sits flush in the concha",
                        "Braided MMCX cable with gold-plated connectors and low microphonics",
                        "Viscoelastic foam and silicone ear adapters in three sizes"
                ),
                List.of(
                        "Legendary Sennheiser sound curve at an accessible entry price",
                        "Dual sound profile versatility via position-adjustable ear tips",
                        "Weighs only 4 grams per side for all-day listening comfort",
                        "Ideal companion for portable DACs and high-res mobile listening"
                ),
                List.of("Sennheiser IE 200 Earphones", "Braided 3.5mm MMCX Cable", "3 Pairs Silicone Ear Adapters (S/M/L)", "3 Pairs Memory Foam Adapters (S/M/L)", "Carrying Pouch"),
                List.of(
                        spec("Transducer Principle", "7mm TrueResponse Dynamic"),
                        spec("Frequency Response", "6 Hz - 20,000 Hz"),
                        spec("Impedance", "18 Ohms"),
                        spec("SPL", "119 dB (1 kHz, 1 Vrms)"),
                        spec("THD", "< 0.08% (1 kHz, 94 dB)"),
                        spec("Cable Length", "1.2 m")
                )
        ));

        // 3. EARBUDS (True Wireless)
        products.add(createProduct(
                "Sony WF-1000XM5 TWS",
                "Sony",
                ProductCategory.EARBUDS,
                "24990.00",
                45,
                "The highest-rated wireless noise canceling earbuds on the market. Powered by Dynamic Driver X and dual proprietary processors for unprecedented high-resolution sound and noise reduction.",
                "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "Dynamic Driver X with dome-edge separation for wider frequency response and deep punch",
                        "Dual processors: Integrated Processor V2 & HD Noise Canceling Processor QN2e",
                        "LDAC high-resolution wireless codec with DSEE Extreme AI upscaling",
                        "AI-based bone conduction sensors and deep neural network for pristine call quality",
                        "24 hours total battery life with Qi wireless charging case"
                ),
                List.of(
                        "20% smaller and 25% lighter than previous generation XM4",
                        "IPX4 water resistance against sweat and rain",
                        "Multipoint Bluetooth 5.3 connection with LE Audio support",
                        "Noise Isolation Earbud Tips made of exclusive polyurethane foam material"
                ),
                List.of("Sony WF-1000XM5 Earbuds", "Wireless Charging Case", "4 Sizes Noise Isolation Foam Tips (SS/S/M/L)", "USB-C Cable", "Reference Guide"),
                List.of(
                        spec("Driver Unit", "8.4 mm Dynamic Driver X"),
                        spec("Frequency Response", "20 Hz - 40,000 Hz (LDAC 96kHz, 990kbps)"),
                        spec("Battery Life", "8 hrs (Earbuds ANC) + 16 hrs (Case) = 24 hrs Total"),
                        spec("Water Resistance", "IPX4"),
                        spec("Bluetooth", "v5.3 (LDAC, AAC, SBC, LC3)"),
                        spec("Weight", "Approx. 5.9 g per earbud")
                )
        ));

        products.add(createProduct(
                "Devialet Gemini II",
                "Devialet",
                ProductCategory.EARBUDS,
                "39990.00",
                20,
                "High-end French acoustic engineering compressed into an iconic luxury true wireless earbud. Featuring 10mm titanium-coated drivers and Devialet Adaptive Noise Cancellation with wind-reduction technology.",
                "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "10mm Titanium-coated dynamic transducer with high-excursion capability",
                        "Devialet Adaptive Noise Cancellation dynamically recalibrates 2,000 times per second",
                        "Internal Delay Compensation (IDC) eliminates noise canceling artifacts",
                        "Wind Defense Technology with anti-wind acoustic mesh and dual beamforming mics",
                        "Luxury matte black chassis with chrome slider charging cradle"
                ),
                List.of(
                        "Devialet's iconic deep bass and crystalline acoustic separation",
                        "Bluetooth 5.2 Multipoint with aptX codec support",
                        "Qi wireless charging and 22 hours overall battery endurance",
                        "Ergonomic luxury finish with customizable touch surfaces"
                ),
                List.of("Devialet Gemini II Earbuds", "Wireless Charging Cradle", "USB-C to USB-A Charging Cable", "4 Sizes Silicone Eartips (XS/S/M/L)", "Documentation"),
                List.of(
                        spec("Speaker Driver", "Custom 10mm Titanium-coated driver"),
                        spec("Frequency Range", "5 Hz - 20,000 Hz"),
                        spec("Active Noise Canceling", "Devialet Adaptive ANC (Up to 40dB reduction)"),
                        spec("Battery", "5 hours single charge, 22 hours with case"),
                        spec("Wireless Charging", "Qi Certified & USB-C"),
                        spec("Weight", "6 g per earbud")
                )
        ));

        products.add(createProduct(
                "Apple AirPods Pro 2 (USB-C)",
                "Apple",
                ProductCategory.EARBUDS,
                "24900.00",
                60,
                "Powered by Apple's revolutionary H2 chip, the AirPods Pro 2 elevate your audio experience with up to 2x more Active Noise Cancellation, Adaptive Audio, and Personalized Spatial Audio with dynamic head tracking.",
                "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "Apple H2 headphone chip delivers smarter noise cancellation and immersive sound",
                        "Low-distortion custom Apple driver and high dynamic range amplifier",
                        "Adaptive Audio dynamically blends Transparency mode and Active Noise Cancellation",
                        "Touch control allows swiping the stem to effortlessly adjust volume",
                        "MagSafe Charging Case (USB-C) with built-in speaker and lanyard loop"
                ),
                List.of(
                        "Up to 2x more Active Noise Cancellation than 1st generation",
                        "Lossless Audio capable with Apple Vision Pro",
                        "IP54 dust, sweat, and water resistance for earbuds and charging case",
                        "Precision Finding with U1 chip to locate your case using Find My"
                ),
                List.of("AirPods Pro 2", "MagSafe Charging Case (USB-C)", "Silicone Ear Tips (XS/S/M/L)", "USB-C Charge Cable", "Documentation"),
                List.of(
                        spec("Processor", "Apple H2 headphone chip in earbuds, U1 chip in case"),
                        spec("Audio Features", "ANC, Adaptive Transparency, Spatial Audio, Adaptive EQ"),
                        spec("Battery Life", "Up to 6 hours listening (ANC on), up to 30 hours with case"),
                        spec("Resistance Rating", "IP54 Dust, Sweat, and Water Resistant"),
                        spec("Connectivity", "Bluetooth 5.3")
                )
        ));

        // 4. SPEAKERS (Hi-Fi & Wireless)
        products.add(createProduct(
                "KEF LS50 Wireless II - Carbon Black",
                "KEF",
                ProductCategory.SPEAKER,
                "249990.00",
                8,
                "The ultimate all-in-one wireless Hi-Fi active speaker system. Featuring KEF's 12th generation Uni-Q driver array with revolutionary Metamaterial Absorption Technology (MAT) and 760W of dedicated audiophile amplification.",
                "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "12th Gen 5.25\" Uni-Q driver array with Metamaterial Absorption Technology (MAT)",
                        "MAT absorbs 99% of unwanted high-frequency sound from driver rear",
                        "760W total system power: dedicated 280W Class D for mid/bass + 100W Class AB for treble",
                        "W2 wireless platform streaming up to 24-bit/384kHz, DSD256, and MQA decoding",
                        "Extensive connectivity: HDMI eARC, Optical, Coaxial, 3.5mm, AirPlay 2, Roon Ready"
                ),
                List.of(
                        "A complete high-end audiophile stereo system in two elegant powered cabinets",
                        "Uni-Q point source delivers a single, perfectly uniform acoustic sweet spot",
                        "Music Integrity Engine (DSP) optimized for phase and timing perfection",
                        "Matte Carbon Black finish with matched copper-gold driver cone"
                ),
                List.of("KEF LS50 Wireless II (Pair)", "Infrared Remote Control", "Inter-speaker Cable (3m)", "2x Power Cords (2m)", "Quick Start Guide"),
                List.of(
                        spec("Driver Array", "Uni-Q Driver: 1\" Vented Aluminum Tweeter with MAT + 5.25\" Magnesium/Aluminum Woofer"),
                        spec("Amplifier Power", "LF: 280W Class D, HF: 100W Class AB (Per Speaker)"),
                        spec("Max Output (SPL)", "108 dB"),
                        spec("Frequency Range (-6dB)", "40 Hz - 47,000 Hz"),
                        spec("Supported Resolution", "Up to 384kHz/24bit, DSD256, MQA"),
                        spec("Dimensions & Weight", "305 x 200 x 311 mm, 20.1 kg total system")
                )
        ));

        products.add(createProduct(
                "Devialet Phantom I 108 dB",
                "Devialet",
                ProductCategory.SPEAKER,
                "299990.00",
                5,
                "An engineering marvel producing physical, implosive sound down to 14Hz. Delivering 1100W RMS of power with a Grade 1 pure Titanium tweeter and side-firing hermetic woofers moving under 30kg of pressure.",
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "1100 Watts RMS power handling delivering up to 108 dB SPL of pure clarity",
                        "Grade 1 Titanium tweeter for pristine, razor-sharp high frequencies",
                        "Heart Bass Implosion (HBI) subwoofers producing infrabass down to 14 Hz",
                        "Analog Digital Hybrid (ADH) amplification combining Class A warmth with Class D power",
                        "Speaker Active Matching (SAM) reproducing exact acoustic signal pressure"
                ),
                List.of(
                        "Frequency range extends beyond human hearing: 14Hz to 27kHz",
                        "Zero background noise, zero distortion (0.0005%), and zero saturation",
                        "Dark Chrome side plates with matte black acoustic spherical body",
                        "Includes Devialet Remote 2.0 with precision volume ring"
                ),
                List.of("Devialet Phantom I 108 dB Speaker", "Devialet Remote 2.0", "Power Cable", "Documentation"),
                List.of(
                        spec("Maximum Sound Level", "108 dB SPL at 1 meter"),
                        spec("Total Amplification Power", "1100 Watts RMS"),
                        spec("Frequency Response", "14 Hz to 27,000 Hz (-6dB)"),
                        spec("THD+N", "0.0005% | Saturation: 0 | Background Noise: 0 dB SPL at 50cm"),
                        spec("Connectivity", "AirPlay 2, Spotify Connect, Bluetooth, Optical, Roon Ready"),
                        spec("Weight", "11.4 kg")
                )
        ));

        // 5. SOUNDBARS (Home Theater Audio)
        products.add(createProduct(
                "Sennheiser AMBEO Soundbar Max",
                "Sennheiser",
                ProductCategory.SOUNDBAR,
                "219990.00",
                6,
                "The undisputed king of all-in-one home cinema. Replicates a full 5.1.4 immersive spatial theater system from a single standalone bar, powered by 13 high-end drivers and state-of-the-art room calibration.",
                "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "13 Independent high-end drivers: 6x 4\" long-throw woofers + 5x 1\" aluminum tweeters + 2x 3.5\" top-firing",
                        "Recreates a true 5.1.4 Dolby Atmos, DTS:X, and MPEG-H 3D spatial setup without satellite speakers",
                        "Deep sub-bass extension down to 30 Hz without needing an external subwoofer",
                        "Automated acoustic room calibration with included precision microphone",
                        "HDMI eARC with 3x HDMI 2.0a inputs for gaming consoles and 4K media players"
                ),
                List.of(
                        "Unrivaled 3D audio realism created in collaboration with the Fraunhofer IIS Institute",
                        "Upmixes stereo and 5.1 content into 3D AMBEO spatial audio",
                        "Massive brushed aluminum housing with integrated OLED display",
                        "AirPlay 2, Google Chromecast, Spotify Connect, and Bluetooth"
                ),
                List.of("Sennheiser AMBEO Soundbar Max", "Calibration Microphone", "Infrared Remote Control", "High-Speed HDMI Cable", "Power Cord", "User Manual"),
                List.of(
                        spec("Channels", "5.1.4 Spatial Configuration"),
                        spec("Total Amplification", "500W (Class D)"),
                        spec("Frequency Response", "30 Hz to 20,000 Hz (-3dB)"),
                        spec("Audio Formats", "Dolby Atmos, DTS:X, MPEG-H, Sony 360 Reality Audio"),
                        spec("HDMI Ports", "3x HDMI In, 1x HDMI Out (eARC)"),
                        spec("Dimensions & Weight", "126.5 x 13.5 x 17.1 cm, 18.5 kg")
                )
        ));

        products.add(createProduct(
                "Sonos Arc Ultra Soundbar",
                "Sonos",
                ProductCategory.SOUNDBAR,
                "99990.00",
                15,
                "Featuring groundbreaking Sound Motion technology, the Arc Ultra delivers 9.1.4 Dolby Atmos spatial mapping with twice the bass of its predecessor and ultra-clear dialogue reproduction.",
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "Sound Motion transducer technology delivers massive bass from an ultra-slim enclosure",
                        "14 Sonos-engineered drivers: 7 silk-dome tweeters, 6 midwoofers, and Sound Motion woofer",
                        "9.1.4 Spatial Audio rendering placing sounds all around your living room",
                        "Advanced Speech Enhancement with multiple levels for crystal-clear whispered dialogue",
                        "Trueplay tuning technology customizes acoustic output to the unique layout of your room"
                ),
                List.of(
                        "Dolby Atmos spatial audio with height channels",
                        "Seamless integration with all Sonos multi-room and sub units",
                        "HDMI eARC connectivity with TV remote sync",
                        "Sleek matte black architectural enclosure"
                ),
                List.of("Sonos Arc Ultra Soundbar", "Power Cable (2m)", "HDMI Cable (1.5m)", "Optical Audio Adapter", "Documentation"),
                List.of(
                        spec("Channel Configuration", "9.1.4 Spatial Atmos Rendering"),
                        spec("Amplifiers", "15 Class-D digital amplifiers"),
                        spec("Microphones", "Far-field microphone array with voice control"),
                        spec("Connectivity", "HDMI eARC, Wi-Fi 6, Bluetooth 5.3, AirPlay 2"),
                        spec("Dimensions", "1178 x 75 x 110.6 mm"),
                        spec("Weight", "5.9 kg")
                )
        ));

        products.add(createProduct(
                "Devialet Dione 5.1.2 Soundbar",
                "Devialet",
                ProductCategory.SOUNDBAR,
                "199990.00",
                5,
                "High-end acoustic design meets high-impact home theater. Devialet Dione features 17 autonomous neodymium drivers including 8 internal SAM-powered subwoofers and the patented ORB central sphere.",
                "https://images.unsplash.com/photo-1520170350707-b2da59970118?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "17 Custom neodymium drivers: 8 long-throw subwoofers + 9 full-range aluminum drivers",
                        "950 Watts RMS total amplification delivering massive 101 dB SPL",
                        "ORB Central Sphere mechanically rotates to adapt whether mounted on wall or flat on cabinet",
                        "SPACE audio technology upmixes any stereo or 5.1 signal into 5.1.2 3D spatial field",
                        "Speaker Active Matching (SAM) enables bass down to 24 Hz without an external subwoofer"
                ),
                List.of(
                        "All-in-one standalone soundbar with built-in reference grade subwoofers",
                        "Dolby Atmos 5.1.2 hardware decoding",
                        "Auto-room calibration via Devialet App",
                        "Anodized dark aluminum and acoustic fabric construction"
                ),
                List.of("Devialet Dione Soundbar", "High Speed HDMI Cable (eARC)", "TOSLINK Optical Cable", "Power Cable", "Wall Mount Brackets & Template"),
                List.of(
                        spec("Drivers", "17x Devialet custom neodymium drivers"),
                        spec("Amplification", "950W RMS Devialet Intelligence Processor"),
                        spec("Max SPL", "101 dB SPL @ 1m"),
                        spec("Frequency Response", "24 Hz - 21,000 Hz"),
                        spec("Audio Formats", "Dolby Atmos, PCM, Dolby Digital, Dolby TrueHD"),
                        spec("Weight", "12.0 kg")
                )
        ));

        products.add(createProduct(
                "Bose Smart Ultra Soundbar",
                "Bose",
                ProductCategory.SOUNDBAR,
                "89900.00",
                20,
                "Top-tier Dolby Atmos soundbar with Bose TrueSpace technology and AI Dialogue Mode that automatically balances speech and action so you never miss a word.",
                "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "Nine custom dipole transducers including two upward-firing PhaseGuide arrays",
                        "AI Dialogue Mode uses machine learning to enhance vocal clarity in real time",
                        "Bose TrueSpace technology intelligently upmixes non-Atmos stereo content into spatial sound",
                        "ADAPTiQ audio room calibration custom-tunes sound to your room acoustics",
                        "Voice4Video technology expands Alexa capabilities to control your TV and cable box"
                ),
                List.of(
                        "Dolby Atmos and Atmos-encoded content support",
                        "Premium impact-resistant glass top and wraparound metal grille",
                        "Wi-Fi, Bluetooth 5.0, Apple AirPlay 2, Spotify Connect, and Chromecast",
                        "SimpleSync pairs with select Bose wireless headphones for private late-night viewing"
                ),
                List.of("Bose Smart Ultra Soundbar", "HDMI eARC Cable", "Optical Cable", "ADAPTiQ Headset", "Remote Control with Batteries", "Power Cord"),
                List.of(
                        spec("Supported Formats", "Dolby Atmos, Dolby Digital, Dolby TrueHD, Dolby Digital Plus"),
                        spec("Video Compatibility", "HDMI eARC & 4K Passthrough"),
                        spec("Microphones", "Built-in microphone array for voice pickup"),
                        spec("Dimensions", "104.5 x 5.8 x 10.7 cm"),
                        spec("Weight", "5.8 kg")
                )
        ));

        products.add(createProduct(
                "Samsung Q-Series HW-Q990D 11.1.4ch",
                "Samsung",
                ProductCategory.SOUNDBAR,
                "94990.00",
                14,
                "The ultimate flagship surround package. Features true 11.1.4-channel audio with wireless rear up-firing/side-firing speakers, 8-inch wireless subwoofer, and wireless Dolby Atmos passthrough with 4K 120Hz gaming support.",
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "True 11.1.4 Channel Sound with 22 discrete speakers",
                        "Includes dedicated wireless rear surround speakers with up-firing and side-firing drivers",
                        "Wireless Dolby Atmos transmits 3D surround sound without clumsy HDMI cables to compatible TVs",
                        "SpaceFit Sound Pro auto-calibrates bass and sound field to your room layout",
                        "HDMI 2.1 4K @ 120Hz and VRR passthrough for next-gen PS5/Xbox Series X gaming"
                ),
                List.of(
                        "Full physical surround immersion without running wires across your living room",
                        "Q-Symphony pairs with Samsung TV speakers for combined acoustic wall of sound",
                        "Active Voice Amplifier Pro isolates dialogue from background sound effects",
                        "Game Mode Pro 3D directional audio optimization"
                ),
                List.of("Samsung HW-Q990D Soundbar", "Wireless Subwoofer", "2x Wireless Rear Speakers", "Remote Controller", "HDMI Cable", "Wall Mount Kits", "Power Cables"),
                List.of(
                        spec("Channels", "11.1.4 Channels (22 Total Speakers)"),
                        spec("Total Power Output", "656 Watts"),
                        spec("Subwoofer Driver", "8-inch Acoustic Lens Woofer"),
                        spec("Video Passthrough", "4K 120Hz, HDR10+, VRR, ALLM"),
                        spec("Connectivity", "2x HDMI In, 1x HDMI Out (eARC), Optical, Wi-Fi, Bluetooth")
                )
        ));

        // 6. HEADSETS (Gaming & Pro Work)
        products.add(createProduct(
                "Audeze Maxwell Planar Magnetic Headset",
                "Audeze",
                ProductCategory.HEADSET,
                "32990.00",
                25,
                "The undisputed king of audiophile gaming headsets. Built around massive 90mm planar magnetic drivers that deliver pinpoint positional accuracy and subterranean bass unknown to traditional gaming headsets.",
                "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "90mm Planar Magnetic Drivers with Uniforce voice coils & Fluxor neodymium magnets",
                        "Ultra-low latency wireless (3x the range of standard 2.4GHz) via USB-C dongle",
                        "Bluetooth 5.3 with multipoint, LDAC, and LC3 support",
                        "Over 80 hours battery life with 20-minute quick charge for all-day play",
                        "Detachable broadcast-grade boom mic with dedicated hardware AI noise filtering"
                ),
                List.of(
                        "3x larger driver surface area than competing flagship gaming headsets",
                        "Class-leading 24-bit/96kHz high-resolution sound playback",
                        "Reinforced aluminum and steel chassis with replaceable suspension strap",
                        "Dolby Atmos hardware license included"
                ),
                List.of("Audeze Maxwell Headset", "Detachable Hypercardioid Boom Mic", "USB-C Wireless Dongle", "USB-C to USB-A Adapter", "USB-C Charging Cable", "3.5mm TRRS Analog Cable"),
                List.of(
                        spec("Transducer Type", "90mm Planar Magnetic"),
                        spec("Frequency Response", "10 Hz - 50,000 Hz"),
                        spec("Max SPL", "> 120 dB"),
                        spec("Battery Life", "80+ hours @ 80dBA"),
                        spec("Wireless Latency", "< 20 ms (via 2.4GHz dongle)"),
                        spec("Weight", "490 g")
                )
        ));

        products.add(createProduct(
                "Sennheiser HD 490 Pro Plus",
                "Sennheiser",
                ProductCategory.HEADSET,
                "39990.00",
                16,
                "The ultimate professional open-back reference studio mixing and high-resolution spatial tracking headset. Engineered to eliminate audio blind spots and deliver unmatched spatial clarity with zero ear fatigue.",
                "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "38mm dynamic open-back transducers with state-of-the-art neodymium magnets",
                        "Innovative low-frequency cylinder system ensures full, clear, and accurate low-end response",
                        "Open-mesh metal grille architecture minimizing internal acoustic reflections",
                        "Dual sets of washable, ergonomic ear pads for Mixing (fabric) and Producing (velour)",
                        "Detachable balanced mini-XLR cable with patented internal coiled damping"
                ),
                List.of(
                        "Engineered in Germany, hand-assembled in Romania",
                        "Includes dearVR MIX-SE spatial monitoring DAW plugin license",
                        "Ultra-lightweight 260g chassis with ergonomic headband pressure distribution",
                        "Braided, low-microphonic balanced cables with left/right dual cable input options"
                ),
                List.of("Sennheiser HD 490 Pro Headphone", "Mixing Ear Pads (Fabric)", "Producing Ear Pads (Velour)", "1.8m Straight Cable", "3m Straight Cable", "3.5mm to 6.35mm Adapter", "Extra Headband Pad", "Hard Premium Case"),
                List.of(
                        spec("Acoustic Principle", "Open-back Circumaural"),
                        spec("Transducer Size", "38 mm Dynamic"),
                        spec("Frequency Response", "5 Hz - 36,100 Hz (-10 dB)"),
                        spec("Impedance", "130 Ohms"),
                        spec("Max SPL", "128 dB SPL (1 kHz @ 5% THD)"),
                        spec("Weight", "260 g (without cable)")
                )
        ));

        products.add(createProduct(
                "Beyerdynamic MMX 300 Pro (Gen 3)",
                "Beyerdynamic",
                ProductCategory.HEADSET,
                "27990.00",
                20,
                "Handmade in Germany. Combines Beyerdynamic's world-class STELLAR.45 studio transducer with a broadcast-grade condenser microphone for tournament-grade audio playback and voice clarity.",
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "STELLAR.45 Studio Transducer system delivering studio reference precision sound",
                        "10mm Condenser cardioid capsule microphone with broadcast frequency range",
                        "Closed-back acoustic design providing outstanding passive environmental noise isolation",
                        "Soft velour replaceable ear cushions with integrated fontanelle notch in headband",
                        "Universal cable system with in-line mic mute and rotary analog volume dial"
                ),
                List.of(
                        "Handcrafted at Beyerdynamic headquarters in Heilbronn, Germany",
                        "Broadcast-quality vocal recording rivals standalone studio microphones",
                        "Rugged spring steel headband built to endure intense daily usage",
                        "Compatible with PC, PlayStation 5, Xbox Series X, and Nintendo Switch"
                ),
                List.of("Beyerdynamic MMX 300 Pro Headset", "1.2m Console Audio Cable (3.5mm 4-pole)", "2.5m PC Audio Cable (Dual 3.5mm)", "6.35mm Gold-Plated Adapter", "Hard Shell Carry Case"),
                List.of(
                        spec("Transducer Type", "Dynamic STELLAR.45"),
                        spec("Frequency Response", "5 Hz - 40,000 Hz"),
                        spec("Nominal Impedance", "48 Ohms"),
                        spec("Microphone Transducer", "10mm Back Electret Condenser"),
                        spec("Microphone Frequency Range", "20 Hz - 20,000 Hz"),
                        spec("Weight", "332 g")
                )
        ));

        products.add(createProduct(
                "Audio-Technica ATH-GDL3 Open-Air",
                "Audio-Technica",
                ProductCategory.HEADSET,
                "11990.00",
                35,
                "Weighing only 220 grams, the ATH-GDL3 is one of the lightest open-back gaming headsets in existence. Featuring large 45mm drivers delivering an immersive open sound field and deep acoustic spatial awareness.",
                "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&auto=format&fit=crop&q=80&bg=000000",
                List.of(
                        "Open-back acoustic design provides expansive soundstage and localization cues",
                        "Large 45mm high-resolution drivers deliver detailed audio fidelity",
                        "Ultra-lightweight 220g construction for fatigue-free marathon sessions",
                        "Flexible, detachable hypercardioid boom microphone with pop filter",
                        "Left earcup volume control wheel and microphone mute switch"
                ),
                List.of(
                        "Natural, open-air gaming experience keeping your ears cool and comfortable",
                        "High-clarity directional voice pickup for competitive team comms",
                        "Two detachable cables included for PC and console connectivity",
                        "Breathable fabric headband and plush memory foam earpads"
                ),
                List.of("Audio-Technica ATH-GDL3 Headset", "Detachable Microphone with Windscreen", "1.2m Cable with 3.5mm TRRS plug (Console)", "3.0m Cable with 3.5mm Dual Plugs (PC)"),
                List.of(
                        spec("Driver Diameter", "45 mm Dynamic"),
                        spec("Frequency Response", "10 Hz - 35,000 Hz"),
                        spec("Sensitivity", "98 dB/mW"),
                        spec("Impedance", "45 Ohms"),
                        spec("Microphone Polar Pattern", "Hypercardioid"),
                        spec("Weight", "Approx. 220 g (without cable)")
                )
        ));

        productRepository.saveAll(products);
        System.out.println("[DatabaseSeeder] Successfully seeded " + products.size() + " premium audiophile products in INR into product_db.");
    }

    private Product createProduct(
            String name,
            String brand,
            ProductCategory category,
            String priceInr,
            Integer quantity,
            String description,
            String imageUrl,
            List<String> features,
            List<String> highlights,
            List<String> whatsInTheBox,
            List<Map<String, String>> technicalSpecifications
    ) {
        return Product.builder()
                .name(name)
                .brand(brand)
                .category(category)
                .price(new BigDecimal(priceInr))
                .quantity(quantity)
                .description(description)
                .imageUrl(imageUrl)
                .features(features)
                .highlights(highlights)
                .whatsInTheBox(whatsInTheBox)
                .technicalSpecifications(technicalSpecifications)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    private static Map<String, String> spec(String key, String value) {
        Map<String, String> m = new LinkedHashMap<>();
        m.put("key", key);
        m.put("value", value);
        return m;
    }
}
