import json
from django.core.management.base import BaseCommand
from data.models import Province, City


class Command(BaseCommand):
    help = "Load and update provinces and cities from JSON file"

    def handle(self, *args, **options):
        file_path = "data/province.json"

        with open(file_path, encoding="utf-8") as f:
            data = json.load(f)

        for item in data:
            province, _ = Province.objects.update_or_create(
                name=item["name"]
            )

            for city in item["Cities"]:
                City.objects.update_or_create(
                    province=province,
                    name=city["name"]
                )

        self.stdout.write(
            self.style.SUCCESS("✅ Provinces and cities loaded/updated successfully.")
        )
