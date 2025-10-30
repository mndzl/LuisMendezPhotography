from django.http import HttpResponse
from django.shortcuts import render

def landing_page(request):
    images = [
        'portfolio/images/img1.jpg',
        'portfolio/images/img2.jpg',
        'portfolio/images/img3.jpg',
        'portfolio/images/img4.jpeg',
        'portfolio/images/img5.jpg',
        'portfolio/images/img6.jpeg',
        'portfolio/images/img7.jpg',
        'portfolio/images/img8.jpg',
    ]
    testimonials = [
        {'text': 'Luis captured our wedding beautifully! Highly recommend.', 'author': 'Sarah & John', 'photo': 'portfolio/images/img1.jpg'},
        {'text': 'Professional and creative photographer. Loved the photos!', 'author': 'Emily R.', 'photo': 'portfolio/images/img2.jpg'},
        {'text': 'Great experience from start to finish. Stunning results.', 'author': 'Michael T.', 'photo': 'portfolio/images/img3.jpg'},
            {'text': 'Luis captured our wedding beautifully! Highly recommend.', 'author': 'Sarah & John', 'photo': 'portfolio/images/img1.jpg'},
        {'text': 'Professional and creative photographer. Loved the photos!', 'author': 'Emily R.', 'photo': 'portfolio/images/img2.jpg'},
        {'text': 'Great experience from start to finish. Stunning results.', 'author': 'Michael T.', 'photo': 'portfolio/images/img3.jpg'},
        {'text': 'Luis captured our wedding beautifully! Highly recommend.', 'author': 'Sarah & John', 'photo': 'portfolio/images/img1.jpg'},
        {'text': 'Professional and creative photographer. Loved the photos!', 'author': 'Emily R.', 'photo': 'portfolio/images/img2.jpg'},
        {'text': 'Great experience from start to finish. Stunning results.', 'author': 'Michael T.', 'photo': 'portfolio/images/img3.jpg'},

    ]

    context = {
        'images': images,
        'aboutMeImg': 'portfolio/images/Headshot.webp',
        'testimonials': testimonials,
    }

    return render(request, 'portfolio/landing_page.html', context)
