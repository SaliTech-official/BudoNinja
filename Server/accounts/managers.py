from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):

    def create_user(self, full_name, phone_number, password=None, **extra_fields):
        if not full_name:
            raise ValueError('full name must be set')

        if not phone_number:
            raise ValueError("phone number is required")
        
        if not password:
            raise ValueError('password is required.')
        user = self.model(full_name=full_name, phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, full_name, phone_number, password=None, **extra_fields):
        user = self.create_user(full_name, phone_number, password, **extra_fields)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user