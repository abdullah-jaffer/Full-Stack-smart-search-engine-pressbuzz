from django.contrib.postgres.search import SearchVector
from django.http import HttpResponse, JsonResponse
from textblob import TextBlob

from api.forms import ArticleForm
from api.models import Article


def index(request):
    return HttpResponse("So you've accessed our API, why don't you query a keyword/id(s) to get some actual data?")


def sentiments(request):
    term = request.GET.get('term', '')
    sentiment_list = []
    sentiment_dictionary = {}
    if term.strip():
        article_set = Article.objects.annotate(search=SearchVector('content'),).filter(search=term).order_by('-pub_date')
        if article_set.exists():
            for article in article_set.iterator():
                converted_text = TextBlob(article.content)
                polarity = [0.0]
                subjectivity = [0.0]
                for sentence in converted_text.sentences:
                    if term.lower() in sentence.lower():
                        polarity.append(sentence.sentiment.polarity)
                        subjectivity.append(sentence.sentiment.subjectivity)
                average_polarity = sum(polarity)/len(polarity)
                average_subjectivity = sum(subjectivity)/len(subjectivity)
                sentiment_list.append({'id': article.id,
                                       'pub_date': article.pub_date,
                                       'polarity': average_polarity,
                                       'subjectivity': average_subjectivity})
                sentiment_dictionary = {'articles': sentiment_list}
        else:
            return JsonResponse("{'result': error, 'message': No article with this term found}", safe=False)

    return JsonResponse(sentiment_dictionary, safe=False)


def article_data(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            ids = request.POST.get('ids').split(",")
            article_set = Article.objects.filter(id__in=ids)
            article_list = []
            if article_set:
                for article in article_set:
                    article_list.append({'article_url': article.article_url,
                                         'pub_date': article.pub_date,
                                         'title': article.title,
                                         'image_url': article.cover_image,
                                         'authors': article.author
                                         })
            else:
                article_list.append("'result': 'error', 'message': 'No articles with these ids found'")
            return JsonResponse(article_list, safe=False)
