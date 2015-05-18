<h2><?php echo lang('admin.common.menu') ?></h2>

<ul class="modules-list">
<?php foreach (menu() as $menu): ?> 
    <li>
        <a href="<?php echo url($menu['url'], $menu['args']) ?>">
            <?php echo lang($menu['title']) ?> 
        </a>

        <?php if ($submenus = $menu['submenu']): ?> 
        <ul class="modules-submenu">
        <?php foreach ($submenus as $submenu): ?> 
            <li>
                <a href="<?php echo url($submenu['url'], $submenu['args']) ?>">
                <?php echo lang($submenu['title']) ?> 
            </a>
            </li>
        <?php endforeach ?> 
        </ul>
        <?php endif ?> 
    </li>
<?php endforeach ?> 
</ul>