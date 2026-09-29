<?php
/**
 * Plugin Name: MyShop Mini — COD Orders
 * Description: Interview demo plugin: registers order CPT, shortcode checkout form, REST endpoint. Shows plugin dev skill.
 * Version: 1.0.0
 * Author: Your Name
 */
if (!defined('ABSPATH')) exit;

// Custom table-free orders via CPT
add_action('init', function () {
    register_post_type('myshop_order', [
        'labels' => ['name' => 'Shop Orders', 'singular_name' => 'Order'],
        'public' => false, 'show_ui' => true, 'supports' => ['title'],
    ]);
});

// Shortcode checkout form [myshop_checkout]
add_shortcode('myshop_checkout', function () {
    ob_start(); ?>
    <form method="post" class="myshop-checkout">
        <?php wp_nonce_field('myshop_order', 'myshop_order_nonce'); ?>
        <p><label>Name*</label><br><input required name="cname" style="width:100%"></p>
        <p><label>Phone* (09-...)</label><br><input required name="cphone" pattern="09[0-9\- ]{7,12}" style="width:100%"></p>
        <p><label>Address*</label><br><textarea required name="caddr" style="width:100%"></textarea></p>
        <button type="submit" name="myshop_place_order">Place Order (COD)</button>
    </form>
    <?php
    return ob_get_clean();
});

// Handle form securely
add_action('init', function () {
    if (!isset($_POST['myshop_place_order'])) return;
    if (!wp_verify_nonce($_POST['myshop_order_nonce'] ?? '', 'myshop_order')) wp_die('Security check failed');
    $name  = sanitize_text_field($_POST['cname'] ?? '');
    $phone = sanitize_text_field($_POST['cphone'] ?? '');
    $addr  = sanitize_textarea_field($_POST['caddr'] ?? '');
    if (!$name || !$phone || !$addr) wp_die('Please fill all fields');
    $id = wp_insert_post(['post_type' => 'myshop_order', 'post_title' => "$name — $phone", 'post_status' => 'publish']);
    update_post_meta($id, '_addr', $addr);
    wp_redirect(add_query_arg('order', 'success', wp_get_referer() ?: home_url()));
    exit;
});

// REST API: GET /wp-json/myshop/v1/products
add_action('rest_api_init', function () {
    register_rest_route('myshop/v1', '/products', [
        'methods' => 'GET',
        'callback' => function () {
            $q = new WP_Query(['post_type' => 'myshop_product', 'posts_per_page' => 20]);
            $out = [];
            while ($q->have_posts()) { $q->the_post();
                $out[] = ['id' => get_the_ID(), 'title' => get_the_title(),
                          'price' => (int)get_post_meta(get_the_ID(), '_myshop_price', true)];
            }
            return $out;
        },
        'permission_callback' => '__return_true',
    ]);
});
