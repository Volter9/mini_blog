<?php
/**
 * Table view
 * 
 * @var array $data
 */
?>
<ul class="posts">
    <?php foreach ($data as $post): ?> 
    <li>
        <section>
            <div class="header clearfix">
                <div class="left">
                    <a href="<?php echo url('#post', [$post['url']]) ?>">
                        <?php echo $post['title'] ?>
                    </a>
                </div>
                
                <a class="right button blue" 
                   href="<?php echo url('#admin_edit', array($module, $post['id'])) ?>">
                    <?php echo lang('admin.admin.edit') ?> 
                </a>
            </div>
            
            <p><?php echo $post['description'] ?></p>
        </section>
    </li>
    <?php endforeach; ?> 
</ul>