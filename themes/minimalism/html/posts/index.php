<?php
/**
 * Posts list view
 * 
 * @var array      $posts
 *      bool|array $posts['items']      - posts
 *      array      $posts['pagination'] - pagination
 * @var string     $url
 */
?>
<article class="posts">
    <button data-component="add"
            data-item="posts"
            data-ignore="true"
            data-destination=".posts">
        add a post
    </button>
    
    <?php if (!$posts['items']): ?> 
    <div class="post">
        <p><?php echo i18n('posts.empty') ?></p>
    </div>
    <?php else: ?> 
        <?php foreach ($posts['items'] as $post): ?> 
            <?php snippet('snippets/posts', $post) ?>
        <?php endforeach; ?> 
    <?php endif; ?> 
</article>

<?php if ($posts['pages']['pages'] > 1): ?> 
<div class="fluid"><?php 
    $pages = array_merge($posts['pages'], compact('url'));
    
    view('blocks/pagination', $pages, false); 
?></div>
<?php endif; ?> 
