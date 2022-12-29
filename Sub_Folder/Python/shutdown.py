import os
ans_ar = ["Y", "y", "yes", "Yes", "YES"]
while True:
    print("Do you want to shutdown?")
    print("Y/N")
    command = input("Your answer: ")
    if command in ans_ar:
        print("computer: cya")
        os.system("shutdown now")
        break

    else:
        print("exit!")
        break
