# Flask and Celery

Welcome to the Modern Application Development - 2 Screencasts. In this screencast we will see how to setup Celery jobs and make it work with Flask.

- You will need Linux env
- You will have to install and run the Redis. We are going to use it. 


# Why
Generally when you build large systems, You will need a way to run async jobs. These jobs can be triggered by the use through an API call or web request. Or it could be called based on the time by the system. We are going to see how to set up such jobs with Flask and Celery. And how to use it.


# What is celery and information

Celery is a simple, flexible, and reliable distributed system to process vast amounts of messages, while providing operations with the tools required to maintain such a system.

### Broker
### Result backend

### Tasks

## Install
`pip install celery[redis]`

## Setup with flask
1. Create workers.py

```python
from celery import Celery
from flask import current_app as app

celery = Celery("Application Jobs")

# Create a subclass of the task 
# that wraps the task execution in an application context.
# So its available               

class ContextTask(celery.Task):
    def __call__(self, *args, **kwargs):
        with app.app_context():
            return self.run(*args, **kwargs)

```

2. Update the main.py
```python
    # Create celery   
    celery = workers.celery

    # Update with configuration
    celery.conf.update(
        broker_url = app.config["CELERY_BROKER_URL"],
        result_backend = app.config["CELERY_RESULT_BACKEND"]
    )

    celery.Task = workers.ContextTask
    app.app_context().push()
    return app, api, celery
```

## Start Workers
Try local_workers.sh
```sh
celery -A main.celery worker -l info
```

## Call a task
https://docs.celeryproject.org/en/stable/userguide/calling.html


### simple call
```python
    job_id = tasks.calculate_aggregate_likes.delay(article_id)
    print(" Job started with job_id = {}".format(job_id))
```    
### Others

```python
T.delay(arg, kwarg=value)
#Star arguments shortcut to .apply_async. (.delay(*args, **kwargs) calls .apply_async(args, kwargs)).

T.apply_async((arg,), {'kwarg': value})

T.apply_async(countdown=10)
#executes in 10 seconds from now.

T.apply_async(eta=now + timedelta(seconds=10))
#executes in 10 seconds from now, specified using eta

T.apply_async(countdown=60, expires=120)
#executes in one minute from now, but expires after 2 minutes.

T.apply_async(expires=now + timedelta(days=2))
#expires in 2 days, set using datetime.
```

### Get results
```python
result = add_together.delay(23, 42)
result.wait()  # 65
```

### Linking (callbacks/errbacks)
```python
add_together.apply_async((2, 2), link=helloworld.s())
```

Example 2
```python
@app.task
def error_handler(request, exc, traceback):
    print('Task {0} raised exception: {1!r}\n{2!r}'.format(
          request.id, exc, traceback))

add.apply_async((2, 2), link_error=error_handler.s())    
```          


### Chain 
```python
res = chain(add.s(2, 2), add.s(4), add.s(8))()
```

And many other options

https://docs.celeryproject.org/en/stable/userguide/canvas.html

## Scheduled Tasks

### Start beat
https://docs.celeryproject.org/en/stable/userguide/periodic-tasks.html

### Schedule it
Setting these up from within the on_after_configure handler means that we’ll not evaluate the app at module level when using test.s(). Note that on_after_configure is sent after the app is set up, so tasks outside the module where the app is declared (e.g. in a tasks.py file located by celery.Celery.autodiscover_tasks()) must use a later signal, such as on_after_finalize.



### Call  manually

```sh
celery --help
celery inspect --help
celery call --help


celery -A main.celery call application.tasks.just_say_hello --kwargs='{"name": "thej"}'
```





### Tip - Add a test user in create_app

    # user_datastore.create_user(username="thejeshgn",email='i@thejeshgn.com', password=utils.hash_password('password'), active=1)
    # db.session.commit()    
