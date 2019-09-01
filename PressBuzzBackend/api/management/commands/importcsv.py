from django.core.management.base import BaseCommand
from api.models import Article
from dateutil.parser import parse
import csv
class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        with open('E:/PressBuzz/PressBuzz/PressBuzzBackend/api/management/commands/maindata.csv', encoding="utf8", errors='ignore') as file:
            reader = csv.DictReader(file)
            insert_count = 0
            for article in reader:
                if 'On March 3' in article['pub_date']:
                    article['pub_date'] = '2019-08-08'
                if 'On September 22' in article['pub_date']:
                    article['pub_date'] = '2019-08-08'
                if len(article['pub_date']) < 5:
                    article['pub_date'] = '2019-08-08'
                if not article['pub_date']:
                    article['pub_date'] = '2019-08-08'
                if not is_date(article['pub_date'], fuzzy=False):
                    article['pub_date'] = '2019-08-08'
                if '/' in article['pub_date']:
                    article['pub_date'] = article['pub_date'].split("/")
                    if len(article['pub_date']) > 2:
                        article['pub_date'] = article['pub_date'][2] + "-" + article['pub_date'][0] + "-" + article['pub_date'][1]
                    else:
                        article['pub_date'] = '2019-08-08'
                if insert_count > 15626:
                    p = Article(title=article['title'][0:300], article_url=article['article_url'],
                                pub_date=article['pub_date'], author=article['author'][0:100],
                                category=article['category'][0:100], content=article['content'],
                                cover_image=article['cover_image'])
                    p.save()
                    print("{} records inserted".format(insert_count))
                insert_count = insert_count + 1


def is_date(string, fuzzy=False):
    """
    Return whether the string can be interpreted as a date.

    :param string: str, string to check for date
    :param fuzzy: bool, ignore unknown tokens in string if True
    """
    try:
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False
