import numpy as np
import cv2



def main():


    radius = 50
    color = [0, 0, 0]
    for i in range(10):
        img = np.ones((400, 800, 3), np.uint8) * 150
        center_x_right = np.random.randint(low = 450, high=750)
        center_y = np.random.randint(low = 50, high=350)
        cv2.circle(img, (center_x_right, center_y), radius, color, -1)
        cv2.imwrite('right_stimuli_' + str(i) + '.jpg', img)

    for i in range(10):
        img = np.ones((400, 800, 3), np.uint8) * 150
        center_y = np.random.randint(low=50, high=350)
        center_x_left = np.random.randint(low = 50, high=350)

        cv2.circle(img, (center_x_left, center_y), radius, color, -1)
        cv2.imwrite('left_stimuli_' + str(i) + '.jpg', img)

  

if __name__ == '__main__':
    main()

