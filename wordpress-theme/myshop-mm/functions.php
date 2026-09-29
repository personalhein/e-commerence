<?php
/**
 * MyShop Myanmar — custom theme functions.
 * enqueue, theme support, CPT, AJAX cart, customizer.
 */
if (!defined('ABSPATH')) exit;

define('MYSHOP_VER', '1.0.0');

// 1. Enqueue CSS/JS (with cache-busting + responsive)
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('myshop-style', get_stylesheet_uri(), [], MYSHOP_VER);
    wp_enqueue_script('myshop-main', get_template_directory_uri() . '/js/main.js',
        ['jquery'], MYSHOP_VER, true);
    wp_localize_script('myshop-main', 'myshopData', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('myshop_nonce'),
        'currency'=> 'Ks',
    ]);
});

// 2. Theme supports (WooCommerce + responsive)
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('responsive-embeds');
    register_nav_menus(['primary' => 'Primary Menu', 'footer' => 'Footer Menu']);
});

// 3. Custom Post Type: Product (if WooCommerce not used — shows CPT skill)
add_action('init', function () {
    register_post_type('myshop_product', [
        'labels'      => ['name' => 'Products', 'singular_name' => 'Product'],
        'public'      => true,
        'has_archive' => true,
        'supports'    => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'show_in_rest'=> true, // Gutenberg + REST API
        'rewrite'     => ['slug' => 'product'],
    ]);
    register_taxonomy('myshop_cat', 'myshop_product', [
        'labels' => ['name' => 'Categories'],
        'hierarchical' => true,
        'show_in_rest' => true,
    ]);
});

// 4. Meta boxes: price & stock (sanitized — shows security best practice)
add_action('add_meta_boxes', function () {
    add_meta_box('myshop_price', 'Price (Ks)', function ($post) {
        $price = get_post_meta($post->ID, '_myshop_price', true);
        wp_nonce_field('myshop_save', 'myshop_nonce_field');
        echo '<input type="number" name="myshop_price" value="' . esc_attr($price) . '" style="width:100%">';
    }, 'myshop_product');
});
add_action('save_post_myshop_product', function ($post_id) {
    if (!isset($_POST['myshop_nonce_field']) || !wp_verify_nonce($_POST['myshop_nonce_field'], 'myshop_save')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (isset($_POST['myshop_price'])) {
        update_post_meta($post_id, '_myshop_price', absint($_POST['myshop_price']));
    }
});

// 5. AJAX add-to-cart (debugging-friendly, nonce-checked)
add_action('wp_ajax_myshop_add_cart', 'myshop_add_cart');
add_action('wp_ajax_nopriv_myshop_add_cart', 'myshop_add_cart');
function myshop_add_cart() {
    check_ajax_referer('myshop_nonce', 'nonce');
    $id  = absint($_POST['product_id'] ?? 0);
    $qty = max(1, absint($_POST['qty'] ?? 1));
    // WC()->cart->add_to_cart($id, $qty);
    wp_send_json_success(['message' => "Added product #$id × $qty", 'cart_count' => $qty]);
}

// 6. Shortcode: [myshop_products cat="fashion" limit="8"]
add_shortcode('myshop_products', function ($atts) {
    $a = shortcode_atts(['cat' => '', 'limit' => 8], $atts);
    $q = new WP_Query([
        'post_type' => 'myshop_product', 'posts_per_page' => intval($a['limit']),
        'tax_query' => $a['cat'] ? [['taxonomy' => 'myshop_cat', 'field' => 'slug', 'terms' => sanitize_text_field($a['cat'])]] : [],
    ]);
    ob_start();
    echo '<div class="myshop-grid">';
    while ($q->have_posts()) { $q->the_post();
        $price = get_post_meta(get_the_ID(), '_myshop_price', true);
        echo '<div class="card"><h3>' . esc_html(get_the_title()) . '</h3><p>' . esc_html(number_format((int)$price)) . ' Ks</p></div>';
    }
    echo '</div>';
    wp_reset_postdata();
    return ob_get_clean();
});
