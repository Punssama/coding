# # Bai 1
# # kien thuc trong bai
# # vong lap
# # cau lenh dieu kien

def findNum(str, stp):
     summ = 0
     for i in range(str, stp+1):
         summ += i
         result = i
         checker = round(stp - (summ/2))

         if (checker < 0) ^ (checker == 0):
             print("ket qua bai 1:", result)
             break


findNum(2, 7)

# # Bai 2

# # kien thuc trong bai
# # cau lenh dieu kien
# # vong lap
# # backtracking, brute force
# # mang
# # chao doi gia tri cua mang

# resultArr = []


# def toInt(List):
#     nums = int(''.join(List))
#     if nums % 30 == 0:
#         resultArr.append(nums)


# def hoanvi(a, str, stp):  # input [A,B,C], 0,n-1=2
#     if str == stp:
#         toInt(a)
#     else:
#         for i in range(str, stp+1):
#             a[str], a[i] = a[i], a[str]  # chao doi gia tri
#             hoanvi(a, str+1, stp)  # goi lai ham hoan vi
#             # backtracking
#             a[str], a[i] = a[i], a[str]  # chao doi gia tri


# num = 12498567859
# num = str(num)  # convert type cua num qua str
# n = len(num)  # dem so phan tu trong num
# a = list(num)  # tao list cho num
# hoanvi(a, 0, n-1)

# if len(resultArr) == 0:
#     time.sleep(0)
#     print("ket qua bai 2:", -1)
# else:
#     print("ket qua bai 2:", max(resultArr))
