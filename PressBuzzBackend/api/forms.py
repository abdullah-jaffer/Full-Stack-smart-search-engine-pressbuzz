from django import forms


class ArticleForm(forms.Form):
    ids = forms.CharField(widget=forms.Textarea)
