<form class="form" action="<?php echo $scheme['action'] ?>" method="POST">
    <?php if (isset($data['error']) && $errors = $data['error']): ?> 
    <ul class="alert red-alert">
        <?php foreach ($errors as $error): ?> 
        <li><?php echo $error ?></li>
        <?php endforeach; ?> 
    </ul>
    <?php endif; ?> 
    
    <?php foreach ($scheme['form'] as $field => $type): ?> 
    <div class="field group">
        <div class="field-label left">
            <label for="form_<?php echo $field ?>">
                <?php echo array_get($data, "field.$field", $field) ?> 
            </label>
        </div>
        
        <div class="field-element right">
            <?php build_element($type, array_merge(
                array('name' => $field), 
                array_transfer($data, $field)
            )) ?>
        
            <?php if ($tooltip = array_get($data, "tooltips.$field")): ?> 
            <div class="field-tooltip">
                <?php echo $tooltip ?>
            </div>
            <?php endif; ?> 
        </div> 
    </div>
    <?php endforeach; ?> 
    
    <div class="group">
        <button class="button button-blue right" type="submit">
            <?php echo $scheme['submit'] ?> 
        </button>
    </div>
</form>
