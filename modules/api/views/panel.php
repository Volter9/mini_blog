<!-- mini_blog admin panel -->
<div id="mini_panel">
    <ul class="clearfix">
        <li class="add">
            <a class="button" href="#" title="Create...">
                <i class="fa fa-fw fa-plus"></i>
            </a>
        </li>
        <li>
            <a class="button" href="<?php echo url('#signout') ?>" 
               title="Signout out of '<?php echo users('user.username') ?>'">
                <i class="fa fa-fw fa-sign-out"></i>
            </a>
        </li>
    </ul>
</div>
