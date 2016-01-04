<div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
    <ul class="nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit User'), ['action' => 'edit', $user->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete User'), ['action' => 'delete', $user->id], ['confirm' => __('Are you sure you want to delete # {0}?', $user->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Users'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New User'), ['action' => 'add']) ?> </li>
    </ul>
</div>
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8">
                            <h2>Adil Ali</h2>

                            <p><strong>About: </strong> Web Designer, UI/UX Engineer</p>

                            <p><strong>Hobbies: </strong> Indie music while drifting in my 540i BMW. </p>

                            <p><strong>Skills: </strong>
                                <span class="label label-info tags">html5</span>
                                <span class="label label-info tags">css3</span>
                                <span class="label label-info tags">jquery</span>
                                <span class="label label-info tags">bootstrap3</span>
                            </p>

                            <p><strong>Stats: </strong>
                                <span class="label label-primary"><i class="fa fa-user"></i> 20,7K followers</span>
                                <span class="label label-danger"><i class="fa fa-eye"></i> 245 Views</span>
                                <span class="label label-success"><i class="fa fa-cog"></i> 43 Forks</span>
                            </p>
                        </div>
                        <!--/col-->
                        <div class="col-xs-12 col-sm-4 text-center">
                            <ul class="list-inline text-center" title="Social Links">
                                <li><a href="http://twitter.com" title="Twitter Feed" rel="nofollow"><span
                                            class="fa fa-twitter fa-lg"></span></a></li>
                                <li><a href="http://www.facebook.com" title="Facebook Wall" rel="nofollow"><span
                                            class="fa fa-facebook fa-lg"></span></a></li>
                                <li><a href="http://www.linkedin.com" title="LinkedIn Profile" rel="nofollow"><span
                                            class="fa fa-linkedin fa-lg"></span></a></li>
                                <li><a href="http://www.skype.com" title="Skype" rel="nofollow"><span
                                            class="fa fa-skype fa-lg"></span></a></li>
                            </ul>
                            <img
                                src="http://lorempixel.com/600/600/people/"
                                class="center-block img-circle img-responsive">
                            <ul class="list-inline ratings text-center" title="Ratings">
                                <li><a href="#"><span class="fa fa-star fa-lg"></span></a></li>
                                <li><a href="#"><span class="fa fa-star fa-lg"></span></a></li>
                                <li><a href="#"><span class="fa fa-star fa-lg"></span></a></li>
                                <li><a href="#"><span class="fa fa-star fa-lg"></span></a></li>
                                <li><a href="#"><span class="fa fa-star fa-lg"></span></a></li>
                            </ul>
                        </div>
                        <!--/col-->
                    </div>
                    <!--/row-->
                </div>
                <!--/panel-body-->
                <form class="form-horizontal top-border" role="form">
                    <h3 hidden><?= h($user->id) ?></h3>

                    <div class="form-group">
                        <label class="col-md-3 control-label"><?= __('Username:') ?></label>

                        <div class="col-md-8">
                            <div class="form-control">
                                <?= h($user->username) ?>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"><?= __('Password') ?></label>

                        <div class="col-md-8">
                            <input class="form-control" type="password" value="11111122333" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"><?= __('Role:') ?></label>

                        <div class="col-md-8">
                            <div class="form-control">
                                <?= h($user->role) ?>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"><?= __('Hire Date:') ?></label>

                        <div class="col-md-8">
                            <div class="form-control">
                                <?= h($user->created) ?>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"><?= __('Date Updated:') ?></label>

                        <div class="col-md-8">
                            <div class="form-control">
                                <?= h($user->modified) ?>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            </div>
            <!--/panel-->
        </div>
    </div>
</div>
