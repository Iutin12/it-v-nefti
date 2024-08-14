import matplotlib.pyplot as plt


def paint(x,y1):
    plt.plot(x, y1, label='sin(x)', color='blue')  # Первая линия
    # plt.plot(x, y2, label='cos(x)', color='red')   # Вторая линия

    # Добавляем заголовок и метки осей
    plt.title('График функций sin и cos')
    plt.xlabel('x')
    plt.ylabel('y')

    # Добавляем легенду
    plt.legend()

    # Отображаем график
    plt.show()