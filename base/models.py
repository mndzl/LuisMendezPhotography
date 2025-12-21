from django.db import models


class Client(models.Model):
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False)
    email = models.EmailField()
    phone_number = models.CharField(max_length=50)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Category(models.Model):
    name = models.CharField(max_length=20, blank=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"  # plural name


class Session(models.Model):
    title = models.CharField(max_length=200, blank=False)
    location = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, blank=False)
    date = models.DateTimeField()
    client = models.ForeignKey(
        Client, on_delete=models.SET_NULL, null=True, blank=True)
    # cover = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.title} ({self.date.strftime('%b %d')})"


class Gallery(models.Model):
    title = models.CharField(max_length=30, blank=False)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    type = models.CharField(max_length=10)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Galleries"

    def __str__(self):
        return f"{self.title} ({self.session}) - {self.type} "


class Image(models.Model):
    url = models.CharField(max_length=50, blank=False)
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE, blank=False)


class Model(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.client.first_name} in {self.session.title}"

# class Image(models.Model):
#     url = models.ImageField()
#     session = models.ForeignKey(Session, on_delete=models.CASCASE)
