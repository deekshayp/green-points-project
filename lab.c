#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILENAME "students.txt"

int main() {
    FILE *fp;
    char name[50], searchName[50];
    int choice, n, i, found;

    while (1) {
        printf("\n=== Student Records Menu ===\n");
        printf("1. Write Student Names to File\n");
        printf("2. Read and Display Student Names\n");
        printf("3. Search for a Student Name\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {

        case 1:
            fp = fopen(FILENAME, "w");
            if (fp == NULL) {
                printf("Error opening file!\n");
                exit(1);
            }

            printf("Enter number of students: ");
            scanf("%d", &n);

            for (i = 0; i < n; i++) {
                printf("Enter name of student %d: ", i + 1);
                scanf("%s", name);
                fprintf(fp, "%s\n", name);
            }

            fclose(fp);
            printf("Names written to file successfully.\n");
            break;

        case 2:
            fp = fopen(FILENAME, "r");
            if (fp == NULL) {
                printf("File not found!\n");
                break;
            }

            printf("\n--- Student Names in File ---\n");
            while (fscanf(fp, "%s", name) != EOF) {
                printf("%s\n", name);
            }

            fclose(fp);
            break;

        case 3:
            fp = fopen(FILENAME, "r");
            if (fp == NULL) {
                printf("File not found!\n");
                break;
            }

            printf("Enter name to search: ");
            scanf("%s",searchName);

            found = 0;
            i = 0;

            while (fscanf(fp, "%s", name) != EOF) {
                i++;
                if (strcmp(name, searchName) == 0) {
                    printf("Name '%s' found at position %d in file.\n", searchName, i);
                    found = 1;
                    break;
                }
            }

            if (!found) {
                printf("Name '%s' not found in file.\n", searchName);
            }

            fclose(fp);
            break;

        case 4:
            printf("Exiting program...\n");
            exit(0);

        default:
            printf("Invalid choice! Try again.\n");
        }
    }

    return 0;
}
